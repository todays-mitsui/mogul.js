const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

// pp(Expr.lambda('x', Expr.lambda('y', Expr.com(y).apply(Expr.com('x')))));
// => '\x -> \y -> y x'

class HsExpr {
}

class HsLambda extends HsExpr {
  constructor(param, body) {
    super();

    this.params = [param];
    this.body  = body;
  }

  push(param) {
    this.params.unshift(param);

    return this;
  }

  toString() {
    return `\\${this.params.join(' ')}->${this.body}`;
  }
}

class HsApplys extends HsExpr {
  constructor (exprs) {
    super();

    this.exprs = exprs;
  }

  push(expr) {
    this.exprs.push(expr);

    return this;
  }

  toString() {
    const exprStrs = this.exprs.map((expr) => {
      if (
        expr instanceof HsApplys
        || expr instanceof HsLambda
      ) { return `(${expr})`; }

      return ''+expr;
    });

    return exprStrs.join(' ');
  }
}

function pp(expr) {
  return ''+pp_(expr);
}

function pp_(expr) {
  switch (true) {
    case expr instanceof Variable: {
      return expr.label;
    }

    case expr instanceof Combinator: {
      return expr.label;
    }

    case expr instanceof Symbl: {
      return `:${expr.label}`;
    }

    case expr instanceof Apply: {
      const left  = pp_(expr.left);
      const right = pp_(expr.right);

      if (left instanceof HsApplys) {
        return left.push(right);
      } else {
        return new HsApplys([left, right]);
      }
    }

    case expr instanceof Lambda: {
      const body = pp_(expr.body);

      if (body instanceof HsLambda) {
        return body.push(expr.param);
      } else {
        return new HsLambda(expr.param, body);
      }
    }
  }
}

module.exports = pp;
