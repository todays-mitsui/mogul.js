const Identifier = require('./Identifier');
const Expr = require('./Expr');

class Variable extends Expr {
  /**
   * @param {Identifier} ident
   */
  constructor(ident) {
    super();

    this.ident = ident;
  }

  /**
   * @param   {string} label
   * @returns {Expr}
   */
  static create(label) {
    return new this(new Identifier(label));
  }

  equals(other) {
    return this.constructor === other.constructor
      && this.ident.label === other.ident.label;
  }

  rewrite(x, expr) {
    return this.ident.label === x.label ? expr : this;
  }
}

module.exports = Variable;
