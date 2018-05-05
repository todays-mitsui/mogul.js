const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

// pp(Expr.lambda('x', Expr.lambda('y', Expr.com(y).apply(Expr.com('x')))));
// => 'x => (y => y(x))'

class EsExpr {
}

class EsLambda extends EsExpr {
  constructor(param, body) {
    super();

    this.param = param;
    this.body  = body;
  }

  toString() {
    return `function(${this.param}){return ${this.body};}`;
  }
}

class EsApplys extends EsExpr {
  constructor (exprs) {
    super();

    this.exprs = exprs;
  }

  push(expr) {
    this.exprs.push(expr);

    return this;
  }

  formatHead() {
    const head = this.exprs[0];

    if (head instanceof EsLambda) {
      return `(${head})`;
    } else {
      return ''+head;
    }
  }

  formatTails() {
    const tail = this.exprs.slice(1);

    return tail.map((expr) => `(${expr})`);
  }

  toString() {
    const headStr  = this.formatHead();
    const tailStrs = this.formatTails();

    return `${headStr}${tailStrs.join('')}`;
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

      if (left instanceof EsApplys) {
        return left.push(right);
      } else {
        return new EsApplys([left, right]);
      }
    }

    case expr instanceof Lambda: {
      return new EsLambda(expr.param, pp_(expr.body));
    }
  }
}

module.exports = pp;
