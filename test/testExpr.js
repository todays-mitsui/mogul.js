const assert = require('chai').assert

const Identifier = require('../src/js/Types/Identifier');
const Variable   = require('../src/js/Types/Variable');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');


describe('Expr', function () {
  describe('λ式の生成', function() {
    it('変数の生成', function() {
      const x1 = Variable.create('x');
      const x2 = new Variable(new Identifier('x'));

      assert.instanceOf(x1, Variable);
      assert.isOk(x1.equals(x2));
    });

    it('変数の生成', function() {
      const x1 = Expr.var('x');
      const x2 = new Variable(new Identifier('x'));

      assert.instanceOf(x1, Variable);
      assert.isOk(x1.equals(x2));
    });

    it('関数抽象の生成', function() {
      const e1 = Expr.lambda('x', Expr.var('y'));
      const e2 = new Lambda(
        new Identifier('x'),
        new Variable(new Identifier('y'))
      );

      assert.instanceOf(e1, Lambda);
      assert.isOk(e1.equals(e2));
    });

    it('関数適用の生成', function() {
      const x = Variable.create('x');
      const y = Variable.create('y');

      const xy = new Apply(
        new Variable(new Identifier('x')),
        new Variable(new Identifier('y'))
      );

      assert.strictEqual(
        x.apply(y).constructor,
        xy.constructor
      );

      assert.deepEqual(
        x.apply(y),
        new Apply(
          new Variable(new Identifier('x')),
          new Variable(new Identifier('y'))
        )
      )
    });
  });

  describe('等値比較', function() {
    it('x === x', function () {
      const x1 = Variable.create('x');
      const x2 = Variable.create('x');

      assert.isOk(x1.equals(x2));
    });

    it('x !== y', function () {
      const x = Variable.create('x');
      const y = Variable.create('y');

      assert.isNotOk(x.equals(y));
    });

    it('``xz`yz === ``xz`yz', function() {
      const e1 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')));
      const e2 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')));

      assert.isOk(e1.equals(e2));
    });

    it('``xz`yz !== ```xzyz', function() {
      const e1 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')));
      const e2 = Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y'))
        .apply(Expr.var('z'));

      assert.isNotOk(e1.equals(e2));
    });
  });
});
