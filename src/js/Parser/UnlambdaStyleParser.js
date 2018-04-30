const P = require('parsimmon');

const Identifier = require('../Identifier');

const Variable = require('../Expr/Variable');
const Symbl = require('../Expr/Symbl');
const Lambda = require('../Expr/Lambda');
const Apply = require('../Expr/Apply');


const token = parser => ( parser.skip(P.optWhitespace) );

const UnlambdaStyleParser = P.createLanguage({
  // 式
  expr: r =>
    P.alt(
      r.apply,
      r.lambda,
      r.symbol,
      r.variable
    )//.thru(parser => P.optWhitespace.then(parser))
  ,

  // 適用
  apply: r =>
    P.seqMap(
      token(P.string('`')),
      r.expr,
      r.expr,
      (_, left, right) => (new Apply(left, right))
    )
  ,

  // 抽象
  lambda: r =>
    P.seqMap(
      token(P.string('^')),
      r.variable,
      token(P.string('.')),
      r.expr,
      (_1, param, _3, body) => (new Lambda(param, body))
    )
  ,

  // 変数
  variable: r =>
    P.alt(r.singleVariable, r.longVariable)
      .map(label => (new Variable(new Identifier(label))))
      .skip(P.optWhitespace)
  ,

  // シンボル
  symbol: r =>
    P.string(':').then(P.alt(r.singleVariable, r.longVariable))
      .map(label => (new Symbl(new Identifier(label))))
      .skip(P.optWhitespace)
  ,

  singleVariable: () => token(P.range('a', 'z')),

  longVariable:   () => token(P.regex(/[A-Z0-9_]+/)),
});


module.exports = UnlambdaStyleParser;
