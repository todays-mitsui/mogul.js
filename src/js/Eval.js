const { Stack } = require('immutable');
const _ = require('lodash');

const Variable   = require('./Types/Variable');
const Combinator = require('./Types/Combinator');
const Symbl      = require('./Types/Symbl');
const Lambda     = require('./Types/Lambda');
const Apply      = require('./Types/Apply');
const Expr       = require('./Types/Expr');

const Location = require('./Location');


class Eval {
  constructor(context, expr) {
    this.context = context;
    this.expr = expr;

    this._tryStack = Stack();
  }

  sequence() {
    function* gen(_this) {
      let reduced = null;

      while (true) {
        reduced = _this.reduce();

        if (reduced) {
          _this.expr = reduced;

          yield reduced;
        } else {
          break;
        }
      }
    }

    return gen(this);
  }

  reduce() {
    this._tryStack = Stack.of([this.expr, Location.root]);

    let reduced = null;
    while (!this._tryStack.isEmpty() && _.isNull(reduced)) {
      const [expr, location] = this._tryStack.peek();
      this._tryStack = this._tryStack.pop();

      reduced = this._reduce(expr, location);
    }

    return reduced;
  }

  _reduce(expr, location) {
    switch (true) {
      case expr instanceof Lambda: {
        try {
          const [[arg], newLocation] = location.popRightTrees(1);

          return newLocation.reassemble(expr.invoke(arg));
        } catch (e) {
          return null;
        }
      }

      case expr instanceof Apply: {
        const left  = expr.left;
        const right = expr.right;

        this._tryStack = this._tryStack.push([right, location.goRight(left)]);

        return this._reduce(left, location.goLeft(right));
      }

      case expr instanceof Combinator: {
        const func = this.context.get(expr.label);

        if (!func) { return null; }


        try {
          const arity = func.getArity();
          const [args, newLocation] = location.popRightTrees(arity);

          return newLocation.reassemble(func.invoke(...args));
        } catch (e) {
          return null;
        }
      }

      default: {
        return null;
      }
    }
  }
}

module.exports = Eval;
