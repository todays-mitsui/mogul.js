const { UnlambdaStyleParser } = require('./UnlambdaStyleParser');
const { UnlambdaStyleCommandParser } = require('./UnlambdaStyleParser');

const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');
const Expr       = require('../Types/Expr');

const normalize = require('../Types/normalize');

const Func = require('../Types/Func');

const Context = require('../Context/Context');


/**
 * @param   {string} src
 * @returns {Expr}
 */
function parseExpr(src) {
  const expr = UnlambdaStyleParser.expr.tryParse(src);

  return normalize(new Set([]), expr);
}

/**
 * @param   {string} src
 * @returns {Expr}
 */
function parseDefs(src) {
  const funcNameAndFuncs = UnlambdaStyleParser.def.many().tryParse(src);

  return new Context(funcNameAndFuncs);
}

/**
 * @param   {string} src
 * @returns {Expr}
 */
function parseCommand(src) {
  const command = UnlambdaStyleCommandParser.command.tryParse(src);

  if (command.expr) {
    command.expr = normalize(new Set([]), command.expr);
  }

  return command;
}

module.exports = {
  parseExpr,
  parseDefs,
  parseCommand,
};
