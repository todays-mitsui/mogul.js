class UpdateCommand extends Command {
  constructor(funcName, func) {
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
    context.set(funcName, func);

    return context;
  }
}

module.exports = UpdateCommand;
