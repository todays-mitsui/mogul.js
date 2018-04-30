const Expr = require('./Expr');

class Apply extends Expr {
  /**
   * @param {Expr} left
   * @param {Expr} right
   */
  constructor(left, right) {
    super();

    this.left = left;
    this.right = right;
  }

  equals(other) {
    return this.constructor === other.constructor
      && this.left.equals(other.left)
      && this.right.equals(other.right);
  }

  rewrite(x, expr) {
    const left  = this.left.rewrite(x, expr);
    const right = this.right.rewrite(x, expr);

    return new Apply(left, right);
  }
}

module.exports = Apply;
