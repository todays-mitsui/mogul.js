class EvalCommand extends Command {
  constructor(expr) {
    this.expr = expr;
    this.limit = 100;
  }

  /**
   * コマンドを実行して結果を返す
   *
   * @param   {Context}    context    実行時の context
   * @param   {ConsoleOut} consoleOut 標準出力用オブジェクト
   * @returns {Context}               更新された context
   */
  run(context, consoleOut) {
    const iter = this.expr.evals(context);

    consoleOut.push(this.expr);

    let result = iter.next();
    while (!result.done) {
      const expr = result.value;
      stream.push(expr);

      result = iter.next();
    }

    return context;
  }
}

module.exports = EvalCommand;
