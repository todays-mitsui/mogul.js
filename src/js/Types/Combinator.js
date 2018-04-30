const Identifier = require('./Identifier');
const Expr = require('./Expr');

class Combinator extends Expr {
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

  getLabel() {
    return this.ident.label;
  }

  /**
   * @param   {string} label
   * @returns {Expr}
   */
  static create(label) {
    return new this(new Identifier(label));
  }
}

module.exports = Combinator;
