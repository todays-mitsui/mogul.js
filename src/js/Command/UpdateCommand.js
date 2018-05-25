const Command = require('./Command');

class UpdateCommand extends Command {
  constructor(funcName, func) {
    super();

    this.funcName = funcName;
    this.func = func;
  }

  /**
   * コマンドを実行して結果を返す
   *
   * @param   {Context}    context    実行時の context
   * @param   {ConsoleOut} consoleOut 標準出力用オブジェクト
   * @returns {Context}               更新された context
   */
  run(context, consoleOut) {
    console.info(this.funcName, this.func);

    return context._add(this.funcName, this.func);
  }
}

module.exports = UpdateCommand;
