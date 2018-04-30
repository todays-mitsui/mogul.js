
class Expr {
  /**
   * 別のλ式に自身を適用した新しいλ式をつくる
   *
   * @param   {Expr} other
   * @returns {Expr}
   */
  apply(other) {
    const Apply = require('./Apply');

    return new Apply(
      /* left  = */ this,
      /* right = */ other
    );
  }

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

  /**
   * @param   {string} label
   * @returns {Expr}
   */
  static var(label) {
    const Identifier = require('./Identifier');
    const Variable = require('./Variable');

    return new Variable(new Identifier(label));
  }

  /**
   * @param   {string} param
   * @param   {Expr}   expr
   * @returns {Expr}
   */
  static lambda(param, expr) {
    const Identifier = require('./Identifier');
    const Lambda = require('./Lambda');

    return new Lambda(
      new Identifier(param),
      expr
    );
  }
}

module.exports = Expr;
