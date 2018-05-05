class Command {
  /**
   * コマンドを実行して結果を返す
   *
   * @param   {Context}                context 実行時の context
   * @returns {Array.<Context,StdOut>}         更新された context と標準出力の組
   */
  run(context) {
    throw new Error('Not Implemented');
  }
}

module.exports = Command;
