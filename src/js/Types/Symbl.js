const Expr = require('./Expr');

class Symbl extends Expr {
  /**
   * @param {Identifier} ident
   */
  constructor(ident) {
    super();

    this.ident = ident;
  }

  equals(other) {
    return this.constructor === other.constructor
      && this.ident.label === other.ident.label;
  }

  rewrite(x, expr) {
    return this;
  }
}

module.exports = Symbl;
