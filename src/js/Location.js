const { Stack } = require('immutable');
const isStack = Stack.isStack;

const _ = require('lodash');

class Location {
  constructor(stack) {
    this._breadcrumbs = stack;
  }

  /**
   * @param   {Expr}     left
   * @returns {Location}
   */
  goRight(left) {
    const newBreadcrumbs = this._breadcrumbs.push(left);

    return new this.constructor(newBreadcrumbs);
  }

  /**
   * @param   {Expr}     right
   * @returns {Location}
   */
  goLeft(right) {
    if (isStack(this._breadcrumbs.peek())) {
      const rightTrees = this._breadcrumbs.peek();

      const newBreadcrumbs = this._breadcrumbs.pop().push(rightTrees.push(right));

      return new this.constructor(newBreadcrumbs);
    } else {
      const newBreadcrumbs = this._breadcrumbs.push(Stack.of(right));

      return new this.constructor(newBreadcrumbs);
    }
  }

  /**
   * @param   {number} n
   * @returns {Array.<Expr[],Location>}
   */
  popRightTrees(n) {
    const rightTrees = this._breadcrumbs.peek();

    if (!isStack(rightTrees)) {
      throw new Error('There is No Right Trees');
    }

    if (rightTrees.size < n) {
      throw new Error('Insufficient Length　Right Trees');
    }

    const newRightTrees = rightTrees.slice(n);
    const newBreadcrumbs = newRightTrees.size
      ? this._breadcrumbs.pop().push(newRightTrees)
      : this._breadcrumbs.pop();

    return [
      rightTrees.slice(0, n).toArray(),
      new this.constructor(newBreadcrumbs),
    ];
  }

  /**
   * @param   {Expr} expr
   * @returns {Expr}
   */
  reassemble(expr) {
    const breadcrumbs = this._breadcrumbs;

    return this.constructor._reassemble(expr, breadcrumbs);
  }

  /**
   * @param   {Expr}  expr
   * @param   {Stack} breadcrumbs
   * @returns {Expr}
   */
  static _reassemble(expr, breadcrumbs) {
    if (breadcrumbs.isEmpty()) {
      return expr;
    } else if (isStack(breadcrumbs.peek())) {
      const rightTrees = breadcrumbs.peek();

      const newExpr = rightTrees.reduce((expr, right) => (
        expr.apply(right)
      ), expr);

      return this._reassemble(newExpr, breadcrumbs.pop());
    } else {
      const left = breadcrumbs.peek();

      const newExpr = left.apply(expr);

      return this._reassemble(newExpr, breadcrumbs.pop());
    }
  }

  /**
   * @type {Location}
   */
  static get root() {
    return new this(Stack());
  }
}

module.exports = Location;
