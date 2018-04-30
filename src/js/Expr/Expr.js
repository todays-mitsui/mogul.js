class Expr {
  /**
   * 式の中の仮引数を別の式で置き換えた式を返す
   *
   * β簡約: `(^x.M)N => M[x:=N] に相当する
   *
   * @param {Identifier} x
   * @param {Expr} expr
   * @returns {Expr}
   */
  rewrite(x, expr) {
    throw new Error('Not Implemented');
  }
}

module.exports = Expr;
