const P = require('parsimmon');

const Variable   = require('../Types/Variable');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

const Func = require('../Types/Func');


const token = parser => ( P.optWhitespace.then(parser).skip(P.optWhitespace) );

const UnlambdaStyleParser = P.createLanguage({
  // 式
  expr: r =>
    P.alt(
      r.apply,
      r.lambda,
      r.symbl,
      r.variable
    )//.thru(parser => P.optWhitespace.then(parser))
  ,

  // 適用
  apply: r =>
    P.seqMap(
      token(P.string('`')),
      token(r.expr),
      token(r.expr),
      (_, left, right) => ( new Apply(left, right) )
    )
  ,

  // 抽象
  lambda: r =>
    P.seqMap(
      token(P.string('^')),
      token(r.ident),
      token(P.string('.')),
      token(r.expr),
      (_1, param, _3, body) => ( new Lambda(param, body) )
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
  ident: r =>
    P.alt(r.singleVariable, r.longVariable)
  ,

  singleVariable: () => token(P.range('a', 'z')),

  longVariable:   () => token(P.regex(/[A-Z0-9_]+/)),


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
      token(r.lvalue),
      token(P.string('=')),
      token(r.expr),
      ([funcName, params], _, bareExpr) => ( [funcName, new Func(params, bareExpr)] )
    )
  ,


  // 関数定義の左辺値
  lvalue: r =>
    P.alt(
      r.lvalue_,
      r.ident.map(ident => [ident, []])
    ).skip(P.optWhitespace)
  ,
  lvalue_: r =>
    P.seqMap(
      token(P.string('`')),
      r.lvalue,
      r.ident,
      (_, [funcName, params], param) => ( [funcName, [].concat(params, [param])] )
    ).skip(P.optWhitespace)
  ,
});

const UnlambdaStyleCommandParser = P.createLanguage({
  command: r =>
    P.alt(
      r.evalLast,
      r.info,
      r.context,
      r.add,
      r.update,
      r.evalHead,
      r.evalTail,
      r.eval,
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
  UnlambdaStyleParser,
  UnlambdaStyleCommandParser,
};
