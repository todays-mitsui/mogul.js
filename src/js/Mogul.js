const Context        = require('./Context/Context');
const defaultContext = require('./Context/defaultContext');

const { parseDefs, parseCommand } = require('./Parser/Parser');

class Mogul {
  constructor(consoleOut) {
    this.context = this.defaultContext;
    this.consoleOut = consoleOut;
  }

  run(input) {
    const command = parseCommand(input);

    this.consoleOut.splice(0);

    this.context = command.run(this.context, this.consoleOut);

    return this;
  }

  /**
   * @returns {Context}
   */
  get defaultContext() {
    return parseDefs(defaultContext.join('\n'));
  }
}

module.exports = Mogul;
