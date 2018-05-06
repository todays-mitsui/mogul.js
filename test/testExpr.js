const assert = require('chai').assert

const Variable   = require('../src/js/Types/Variable');
const Combinator = require('../src/js/Types/Combinator');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');

const Func    = require('../src/js/Types/Func');
const Context = require('../src/js/Context/Context');


describe('Expr', function () {
  describe('λ式の生成', function() {
    it('変数の生成', function() {
      const x1 = Expr.var('x');
      const x2 = new Variable('x');

      assert.instanceOf(x1, Variable);
      assert.isTrue(x1.equals(x2));
    });

    it('関数抽象の生成', function() {
      const e1 = Expr.lambda('x', Expr.var('y'));
      const e2 = new Lambda(
        'x',
        new Variable('y')
      );

      assert.instanceOf(e1, Lambda);
      assert.isOk(e1.equals(e2));
    });

    it('関数適用の生成', function() {
      const x = Expr.var('x');
      const y = Expr.var('y');

      const xy = new Apply(
        Expr.var('x'),
        Expr.var('y')
      );

      assert.strictEqual(
        x.apply(y).constructor,
        xy.constructor
      );

      assert.isTrue(x.apply(y).equals(xy));
    });
  });

  describe('等値比較', function() {
    it('x === x', function () {
      const x1 = new Variable('x');
      const x2 = new Variable('x');

      assert.isTrue(x1.equals(x2));
    });

    it('x !== y', function () {
      const x = new Variable('x');
      const y = new Variable('y');

      assert.isFalse(x.equals(y));
    });

    it('``xz`yz === ``xz`yz', function() {
      const e1 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')));
      const e2 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')));

      assert.isTrue(e1.equals(e2));
    });

    it('``xz`yz !== ```xzyz', function() {
      const e1 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')));
      const e2 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y'))
        .apply(Expr.var('z'));

      assert.isFalse(e1.equals(e2));
    });
  });
});

describe('Expr とその子クラスには PrettyPrinter を持たせられる', function () {
  Expr.PRETTY_PRINTER = function() {};

  it('Expr.PRETTY_PRINTER', function() {
    assert.exists(Expr.PRETTY_PRINTER);
  });

  it('Variable.PRETTY_PRINTER', function() {
    assert.equal(Variable.PRETTY_PRINTER, Expr.PRETTY_PRINTER);
  });

  it('Combinator.PRETTY_PRINTER', function() {
    assert.equal(Combinator.PRETTY_PRINTER, Expr.PRETTY_PRINTER);
  });

  it('Symbl.PRETTY_PRINTER', function() {
    assert.equal(Symbl.PRETTY_PRINTER, Expr.PRETTY_PRINTER);
  });

  it('Lambda.PRETTY_PRINTER', function() {
    assert.equal(Lambda.PRETTY_PRINTER, Expr.PRETTY_PRINTER);
  });

  it('Apply.PRETTY_PRINTER', function() {
    assert.equal(Apply.PRETTY_PRINTER, Expr.PRETTY_PRINTER);
  });
});

describe('rewrite', function () {
  it('(``xz`yz)[z:=i]', function() {
    expr1 = Expr.var('x')
      .apply(Expr.var('z'))
      .apply(Expr.var('y').apply(Expr.var('z')));

    expr2 = Expr.var('x')
      .apply(Expr.com('i'))
      .apply(Expr.var('y').apply(Expr.com('i')));

    assert.isTrue(
      expr1.rewrite('z', Expr.com('i')).equals(expr2)
    );
  });

  it('`^x.xx[x:=y]', function() {
    expr1 = new Apply(
      new Lambda('x', Expr.var('x')),
      Expr.var('x')
    );

    expr2 = new Apply(
      new Lambda('x', Expr.var('x')),
      Expr.com('y')
    );

    assert.isTrue(
      expr1.rewrite('x', Expr.com('y')).equals(expr2)
    );
  });
});

describe('evals', function() {
  const context = (new Context())
    .set('i', new Func(['x'], Expr.var('x')))
    .set('k', new Func(['x', 'y'], Expr.var('x')))
    .set('s', new Func(
      ['x', 'y', 'z'],
      Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')))
    ));

  it('```skk:x', function() {
    const expr = Expr.com('s')
      .apply(Expr.com('k'))
      .apply(Expr.com('k'))
      .apply(Expr.sym('x'));

    for (let reduced of expr.evals(context)) {
      assert.instanceOf(reduced, Expr);
    }
  });

  it('```skk:x', function() {
    const expr = Expr.com('s')
      .apply(Expr.com('k'))
      .apply(Expr.com('k'))
      .apply(Expr.sym('x'));

    assert.lengthOf(Array.from(expr.evals(context)), 2);
  });
});
