const _ = require('lodash');

const Lambda = require('./Lambda');
const Expr   = require('./Expr');

class Func {
  /**
   * @param {string[]} params
   * @param {Expr}     bareExpr
   */
  constructor(params, bareExpr) {
    this.params = params;
    this.bareExpr = bareExpr;
  }

  equals(other) {
    return this.constructor === other.constructor
      && _.isEqual(this.params, other.params)
      && this.bareExpr.equals(other.bareExpr);
  }

  /**
   * 関数のアリティを返す
   *
   * @see {@link https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AA%E3%83%86%E3%82%A3}
   * @returns {number}
   */
  getArity() {
    return this.params.length;
  }

  /**
   * 関数と同等なλ式を返す。ただし、同等とはいえアリティの情報が失われる
   *
   * Func { params=[x, y], bareExpr=M } に対して
   * Lambda { param=x, body=Lambda { param=y, body=M } } を返す
   *
   * @returns {Expr}
   */
  getBoby() {
    return this.params.reduceRight(
      (expr, param) => ( new Lambda(param, expr) ),
      this.bareExpr
    );
  }
}

module.exports = Func;
