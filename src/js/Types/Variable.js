const Expr       = require('./Expr');

class Variable extends Expr {
  /**
   * @param {string} label
   */
  constructor(label) {
    super();

    this.label = label;
  }

  equals(other) {
    return this.constructor === other.constructor
      && this.label === other.label;
  }

  rewrite(x, expr) {
    return this.label === x ? expr : this;
  }
}

module.exports = Variable;
