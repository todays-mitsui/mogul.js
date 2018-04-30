class Expr {
  /**
   * ２つのλ式の等値比較をする
   *
   * @param   {Expr} other this と等値比較するもう一つのλ式
   * @returns {bool}       this と other が等しければ true さもくば false
   */
  equals(other) {
    throw new Error('Not Implemented');
  }

  /**
   * 式の中の仮引数を別の式で置き換えた式を返す
   *
   * β簡約: `(^x.M)N => M[x:=N] に相当する
   *
   * @param   {Identifier} x
   * @param   {Expr}       expr
   * @returns {Expr}
   */
  rewrite(x, expr) {
    throw new Error('Not Implemented');
  }
}

module.exports = Expr;
