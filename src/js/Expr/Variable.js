const Expr = require('./Expr');

class Variable extends Expr {
  /**
   * @param {Identifier} ident
   */
  constructor(ident) {
    super();

    this.ident = ident;
  }

  rewrite(x, expr) {
    return this.ident.label === x.label ? expr : this;
  }
}

module.exports = Variable;
