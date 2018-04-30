const Expr = require('./Expr');

class Symbl extends Expr {
  /**
   * @param {Identifier} ident
   */
  constructor(ident) {
    super();

    this.ident = ident;
  }

  rewrite(x, expr) {
    return this;
  }
}

module.exports = Symbl;
