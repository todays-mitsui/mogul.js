const Expr = require('./Expr');

class Symbl extends Expr {
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
    return this;
  }
}

module.exports = Symbl;
