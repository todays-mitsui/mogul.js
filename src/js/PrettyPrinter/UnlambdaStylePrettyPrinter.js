const _ = require('lodash');

const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

// pp(Expr.lambda('x', Expr.lambda('y', Expr.com(y).apply(Expr.com('x')))));
// => '^x.^y.`yx'

// TODO: このクラス無くて良さそう
class Token {
  /**
   * @param {string} label
   */
  constructor(label) {
    this.label = label;
    this.wideIdentifier = label.length > 1;
  }

  /**
   * @returns {bool}
   */
  isWideIdentifier() {
    return this.wideIdentifier;
  }

  /**
   * @returns {string}
   */
  toString() {
    return this.label;
  }

  static get hat() {
    return new this('^');
  }

  static get dot() {
    return new this('.');
  }

  static get backquot() {
    return new this('`');
  }
}

/**
 * λ式をトークン列に変換する
 *
 * tokenize_() が生成したネストしたトークンの配列を延してフラットなトークン列を返す
 *
 * @param   {Expr}    expr
 * @returns {Token[]}
 */
function tokenize(expr) {
  return _.flattenDeep(tokenize_(expr));
}

/**
 * tokenize() の補助関数
 *
 * λ式の部分式をトークンに変換しながらネストしたトークンの配列を構築する
 * @param {Expr} expr
 */
function tokenize_(expr) {
  switch (true) {
    case expr instanceof Variable: {
      return new Token(expr.label);
    }

    case expr instanceof Combinator: {
      return new Token(expr.label);
    }

    case expr instanceof Symbl: {
      return new Token(`:${expr.label}`);
    }

    case expr instanceof Apply: {
      return [
        Token.backquot,
        tokenize_(expr.left),
        tokenize_(expr.right),
      ];
    }

    case expr instanceof Lambda: {
      return [
        Token.hat,
        new Token(expr.param),
        Token.dot,
        tokenize_(expr.body),
      ];
    }
  }
}


/**
 * λ式を Pretty Print した文字列を返す
 *
 * @param   {Expr}   expr
 * @returns {string}
 */
function pp(expr) {
  const tokens = tokenize(expr);

  return pp_(tokens);
}

/**
 * pp() の補助関数
 *
 * トークン列を読んで適切ないちにスペースを挿入しながら、全体を一つの文字列に連結する
 *
 * @param  {Token[]} tokens
 * @return {string}
 */
function pp_(tokens) {
  if (tokens.length === 1) {
    return '' + tokens[0];
  }

  const [t1, t2] = tokens.slice(0, 2);

  if (t1.wideIdentifier && t2.wideIdentifier) {
    return t1 + ' ' + pp_(tokens.slice(1));
  } else {
    return t1 + pp_(tokens.slice(1));
  }
}


module.exports = pp;
