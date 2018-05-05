const UnlambdaStyleParser = require('./Parser/UnlambdaStyleParser');
const Context = require('./Context/Context');

class App {
  constructor() {
    this._context = new Context();
  }



  get context() {
    return this._context.entries();
  }
}

module.exports = {
  UnlambdaStyleParser,
};
