const _ = require('lodash');
const P = require('parsimmon');

const Variable   = require('../Types/Variable');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

const Func = require('../Types/Func');


const token = parser => ( P.optWhitespace.then(parser).skip(P.optWhitespace) );

const parens = parser => (
  parser.trim(P.optWhitespace)
    .wrap(P.string('('), P.string(')'))
);

const optParens = parser => (
  parser.trim(P.optWhitespace)
    .wrap(P.string('('), P.string(')'))
    .or(parser)
);

const ES6FatArrowStyleParser = P.createLanguage({
  // 式
  expr: r =>
    r.exprs.map(buildApplys)
  ,

  // Apply 以外の式
  _expr: r =>
    P.alt(
      r.lambda,
      r.symbl,
      r.variable
    )
  ,

  exprs: r =>
    P.seqMap(
      token(optParens(r._expr)),
      r._exprs,
      (expr, exprs) => {
        if (exprs.length === 0) {
          return expr;
        } else {
          return [].concat([expr], exprs);
        }
      }
    )
  ,

  _exprs: r =>
    parens(token(r.exprs)).many()
  ,

  // 抽象
  lambda: r =>
    P.seqMap(
      token(optParens(r.params)),
      token(P.string('=>')),
      token(optParens(r.expr)),
      (params, _, body) => { 
        return params.reduceRight(
          (expr, param) => ( new Lambda(param, expr) ),
          body
        );
      }
    )
  ,

  // 変数
  variable: r =>
    r.ident.map(ident => new Variable(ident))
      .skip(P.optWhitespace)
  ,

  // シンボル
  symbl: r =>
    P.string(':').then(r.ident)
      .map(ident => new Symbl(ident))
      .skip(P.optWhitespace)
  ,

  // 識別子
  ident: () => token(P.regex(/[a-zA-Z0-9_]+/)),


  def: r =>
    P.alt(
      r.addFunc,
      r.updateFunc
    )
  ,

  // 関数定義(定義済み関数の上書きを許さない)
  addFunc: r =>
    P.seqMap(
      token(r.lvalue),
      token(P.string(':=')),
      token(r.expr),
      ([funcName, params], _, bareExpr) => ( [funcName, new Func(params, bareExpr)] )
    )
  ,

  // 関数定義(定義済み関数の上書きを許す)
  updateFunc: r =>
    P.seqMap(
      r.lvalue,
      token(P.string('=')),
      token(r.expr),
      ([funcName, params], _, bareExpr) => ( [funcName, new Func(params, bareExpr)] )
    )
  ,


  // 関数定義の左辺値
  lvalue: r =>
    P.alt(
      P.seqMap(
        r.ident,
        token(parens(r.params)),
        (funcName, params) => ([funcName, params])
      ),
      r.ident.map(funcName => [funcName, []])
    ).skip(P.optWhitespace)
  ,

  params: r => 
    r.ident.sepBy(P.regexp(/\s*,\s*/))
  ,

});

function buildApplys(exprs) {
  if (!_.isArray(exprs)) {
    return exprs;
  }

  return exprs.reduce((left, right) => {
    return new Apply(
      left,
      buildApplys(right)
    );
  })
}

const ES6FatArrowStyleCommandParser = P.createLanguage({
  command: r =>
    P.alt(
      r.evalLast,
      r.info,
      r.context,
      r.add,
      r.update,
      r.evalHead,
      r.evalTail,
      r.eval
    )
  ,

  eval: () =>
    UnlambdaStyleParser.expr
    .map((expr) => ({
      command: 'eval',
      expr: expr,
    }))
  ,

  evalLast: () =>
    P.seqMap(
      P.string('!'),
      P.optWhitespace,
      UnlambdaStyleParser.expr,
      (_1, _2, expr) => ({
        command: 'evalLast',
        expr: expr,
      })
    )
  ,


  evalHead: () =>
    P.seqMap(
      P.string(':'),
      P.digits,
      P.whitespace,
      UnlambdaStyleParser.expr,
      (_1, numStr, _3, expr) => ({
        command: 'evalHead',
        expr: expr,
        howMany: parseInt(numStr, 10),
      })
    )
  ,

  evalTail: () =>
    P.seqMap(
      P.string(':-'),
      P.digits,
      P.whitespace,
      UnlambdaStyleParser.expr,
      (_1, numStr, _3, expr) => ({
        command: 'evalTail',
        expr: expr,
        howMany: parseInt(numStr, 10),
      })
    )
  ,

  add: () =>
    UnlambdaStyleParser.addFunc
    .map(([funcName, func]) => ({
      command: 'add',
      funcName: funcName,
      func: func,
    }))
  ,

  update: () =>
    UnlambdaStyleParser.updateFunc
    .map(([funcName, func]) => ({
      command: 'update',
      funcName: funcName,
      func: func,
    }))
  ,

  info: () =>
    P.seqMap(
      P.string('?'),
      P.optWhitespace,
      UnlambdaStyleParser.ident,
      (_1, _2, ident) => ({
        command: 'info',
        ident: ident,
      })
    )
  ,

  context: () =>
    P.seqMap(
      P.string('?'),
      P.optWhitespace,
      P.eof,
      (_1, _2, _3) => ({
        command: 'context',
      })
    )
  ,
});

module.exports = {
  Parser       : ES6FatArrowStyleParser,
  CommandParser: ES6FatArrowStyleCommandParser,
};
