const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');
const Expr       = require('../Types/Expr');


/**
 * 抽象構文木を走査して束縛変数(Variable)と自由変数(コンビネータ, Combinator)を適切に置き換える
 *
 * λ式の中に現れる変数が束縛変数なのか自由変数なのかを判別するには、
 * 変数がそれよりも外側のλ式で束縛済みかどうかをチェックする必要がある。
 * そのチェックをパーザでしようとするとパーザの設計が複雑になる。
 * そのためパーザは全ての変数を束縛変数だと見なして抽象構文木を生成する
 *
 * パーザが吐いた不完全な抽象構文木にこの関数を適用することで、抽象構文木は正しいものになる
 *
 * @param   {Set}  set  束縛済み変数をストックする Set
 * @param   {Expr} expr
 * @returns {Expr}
 */
function normalize(set, expr) {
  switch (true) {
    case expr instanceof Variable: {
      return set.has(expr.label) ? expr : Expr.com(expr.label);
    }

    case expr instanceof Combinator: {
      return set.has(expr.label) ? Expr.var(expr.label) : expr;
    }

    case expr instanceof Symbl: {
      return expr;
    }

    case expr instanceof Apply: {
      return new Apply(
        normalize(set, expr.left),
        normalize(set, expr.right)
      );
    }

    case expr instanceof Lambda: {
      set.add(expr.param);
      return new Lambda(
        expr.param,
        normalize(set, expr.body)
      );
    }
  }
}


module.exports = normalize;
