const _ = require('lodash');

const Lambda = require('./Lambda');
const Expr   = require('./Expr');

const normalize = require('./normalize');


class Func {
  /**
   * @param {string[]} params
   * @param {Expr}     bareExpr
   */
  constructor(params, bareExpr) {
    this.params = params;
    this.bareExpr = normalize(new Set(params), bareExpr);
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

  /**
   * @param   {Expr[]} args
   * @returns {Expr}
   */
  invoke(...args) {
    const pairs = _.zip(this.params, args);

    let body = this.bareExpr;

    for (let i = 0, len = pairs.length; i < len; i++) {
      const [param, expr] = pairs[i];

      body = body.rewrite(param, expr);
    }

    return body;
  }
}

module.exports = Func;
