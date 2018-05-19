// const { Parser, CommandParser } = require('./UnlambdaStyleParser');
const { Parser, CommandParser } = require('./ES6FatArrowStyleParser');

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
  const expr = Parser.expr.tryParse(src);

  return normalize(new Set([]), expr);
}

/**
 * @param   {string} src
 * @returns {Expr}
 */
function parseDefs(src) {
  const lines = src.split('\n').filter((line) => /\s*/.test(line));

  // const funcNameAndFuncs = Parser.def.many().tryParse(src);
  let defs = lines.map((line) => Parser.def.tryParse(line));

  return new Context(defs);
}

/**
 * @param   {string} src
 * @returns {Expr}
 */
function parseCommand(src) {
  const command = CommandParser.command.tryParse(src);

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
