
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
   * λ式を最外最左簡約した結果を返す
   *
   * λ式が簡約基を含まない(=全く簡約できない)場合には null を返す
   *
   * @param   {Context} context
   * @returns {Expr|null}
   */
  reduce(context) {
    const Eval = require('../Eval');

    return (new Eval(context, this)).reduce();
  }

  /**
   * λ式に最外最左簡約を逐次施した結果の列を返す
   *
   * @param   {Context}        context
   * @returns {Iterable<Expr>}
   */
  evals(context) {
    console.info(context);

    const Eval = require('../Eval');

    return (new Eval(context, this)).sequence();
  }

  /**
   * λ式を pretty print する
   *
   * @returns {string}
   */
  pp() {
    if (this.constructor.PRETTY_PRINTER) {
      return this.constructor.PRETTY_PRINTER(this);
    } else {
      return this.toString();
    }
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

  static get PRETTY_PRINTER() {
    return this._PRETTY_PRINTER;
  }

  static set PRETTY_PRINTER(prettyPrinter) {
    this._PRETTY_PRINTER = prettyPrinter;
  }
}

module.exports = Expr;
