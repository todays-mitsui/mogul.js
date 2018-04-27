const P = require('parsimmon');


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
      (_, left, right) => ({ type: 'apply', left, right })
    )
  ,

  // 抽象
  lambda: r =>
    P.seqMap(
      token(P.string('^')),
      r.variable,
      token(P.string('.')),
      r.expr,
      (_1, param, _3, body) => ({ type: 'lambda', param: param.label, body })
    )
  ,

  // 変数
  variable: r =>
    P.alt(r.singleVariable, r.longVariable)
      .map(label => ({ type: 'variable', label }))
      .skip(P.optWhitespace)
  ,

  // シンボル
  symbol: r =>
    P.string(':').then(P.alt(r.singleVariable, r.longVariable))
      .map(label => ({ type: 'symbol', label }))
      .skip(P.optWhitespace)
  ,

  singleVariable: () => token(P.range('a', 'z')),

  longVariable:    () => token(P.regex(/[A-Z0-9_]+/)),
});


module.exports = UnlambdaStyleParser;
