const Context = require('./Context/Context');
const { parseCommand } = require('./Parser/Parser');

class Mogle {
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
}

module.exports = Mogle;
