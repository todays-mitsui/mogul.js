
class Expr {
  /**
   * 別のλ式に自身を適用した新しいλ式をつくる
   *
   * @param   {Expr}  other
   * @returns {Apply}
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
   * @param   {string} x
   * @param   {Expr}   expr
   * @returns {Expr}
   */
  rewrite(x, expr) {
    throw new Error('Not Implemented');
  }

  /**
   * @param   {string}   label
   * @returns {Variable}
   */
  static var(label) {
    const Variable = require('./Variable');

    return new Variable(label);
  }

  /**
   * @param   {string}     label
   * @returns {Combinator}
   */
  static com(label) {
    const Combinator = require('./Combinator');

    return new Combinator(label);
  }

  /**
   * @param   {string} label
   * @returns {Symbl}
   */
  static sym(label) {
    const Symbl = require('./Symbl');

    return new Symbl(label);
  }

  /**
   * @param   {string} param
   * @param   {Expr}   expr
   * @returns {Lambda}
   */
  static lambda(param, expr) {
    const Lambda     = require('./Lambda');

    return new Lambda(param, expr);
  }
}

module.exports = Expr;
