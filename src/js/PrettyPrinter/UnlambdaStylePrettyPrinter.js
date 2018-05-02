const _ = require('lodash');

const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

const PrettyPrinter = require('./PrettyPrinter');

// pp(Expr.lambda('x', Expr.lambda('y', Expr.com(y).apply(Expr.com('x')))));
// => '^x.^y.`yx'

class Token {
  constructor(label) {
    this.label = label;
    this.wideIdentifier = label.length > 1;
  }

  isWideIdentifier() {
    return this.wideIdentifier;
  }

  toString() {
    return this.label;
  }
}

const TOKENS = {
  hat: new Token('^'),
  dot: new Token('.'),
  backquot: new Token('`'),
}

function pp(expr) {
  const tokens = tokenize(expr);

  return pp_(tokens);
}

function pp_(tokens) {
  if (tokens.length === 1) {
    return tokens[0].toString();
  }

  const [t1, t2] = tokens.slice(0, 2);

  if (t1.wideIdentifier && t2.wideIdentifier) {
    return t1.toString() + ' ' + pp_(tokens.slice(1));
  } else {
    return t1.toString() + pp_(tokens.slice(1));
  }
}

function tokenize(expr) {
  return _.flattenDeep(tokenize_(expr));
}

function tokenize_(expr) {
  switch (true) {
    case expr instanceof Variable: {
      return new Token(expr.label);
    }

    case expr instanceof Combinator: {
      return new Token(expr.label);
    }

    case expr instanceof Symbl: {
      return new Token(`:${expr.label}`);
    }

    case expr instanceof Apply: {
      return [
        TOKENS.backquot,
        tokenize_(expr.left),
        tokenize_(expr.right),
      ];
    }

    case expr instanceof Lambda: {
      return [
        TOKENS.hat,
        new Token(expr.param),
        TOKENS.dot,
        tokenize_(expr.body),
      ];
    }
  }
}

module.exports = pp;
