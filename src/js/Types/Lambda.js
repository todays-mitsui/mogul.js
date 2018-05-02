const Expr = require('./Expr');

class Lambda extends Expr {
  /**
   * @param {string} param
   * @param {Expr}   body
   */
  constructor(param, body) {
    super();

    this.param = param;
    this.body = body;
  }

  equals(other) {
    return this.constructor === other.constructor
      && this.param === other.param
      && this.body.equals(other.body);
  }

  rewrite(x, expr) {
    return this.param === x ? this : new Lambda(this.param, this.body.rewrite(x, expr));
  }
}

module.exports = Lambda;
