const Context        = require('./Context/Context');
const defaultContext = require('./Context/defaultContext');

const { parseDefs, parseCommand } = require('./Parser/Parser');

class Mogul {
  constructor() {
    this.context = new Context();
    this.console = [];
  }

  run(input) {
    const command = this._parseCommand(input);

    this.context = command.run(this.context, this.console);

    return this;
  }

  _parseCommand(input) {
    const command = parseCommand(input);
  }

  /**
   * @returns {Context}
   */
  get defaultContext() {
    // console.info(defaultContext);

    return parseDefs(defaultContext.join('\n'));
  }
}

module.exports = Mogul;
