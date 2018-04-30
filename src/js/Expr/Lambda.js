const Identifier = require('../Identifier');
const Expr = require('./Expr');

class Lambda extends Expr {
  /**
   * @param {Identifier} param
   * @param {Expr} body
   */
  constructor(param, body) {
    super();

    this.param = param;
    this.body = body;
  }

  rewrite(x, expr) {
    return this.param.label === x.label ? this : new Lambda(this.param, this.body.rewrite(x, expr));
  }
}

module.exports = Lambda;
