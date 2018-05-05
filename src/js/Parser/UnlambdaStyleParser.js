const P = require('parsimmon');

const Variable   = require('../Types/Variable');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

const Func = require('../Types/Func');


const token = parser => ( parser.skip(P.optWhitespace) );

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
      r.expr,
      r.expr,
      (_, left, right) => ( new Apply(left, right) )
    )
  ,

  // 抽象
  lambda: r =>
    P.seqMap(
      token(P.string('^')),
      r.ident,
      token(P.string('.')),
      r.expr,
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

  // 関数定義
  def: r =>
    P.seqMap(
      r.lvalue,
      token(P.string('=')),
      r.expr,
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

});

module.exports = {
  UnlambdaStyleParser,
  UnlambdaStyleCommandParser,
};
