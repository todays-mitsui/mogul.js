const assert = require('chai').assert

const Identifier = require('../src/js/Types/Identifier');
const Variable = require('../src/js/Types/Variable');
const Symbl = require('../src/js/Types/Symbl');
const Lambda = require('../src/js/Types/Lambda');
const Apply = require('../src/js/Types/Apply');


describe('Expr', function () {
  describe('λ式の生成', function() {
    it('変数の生成', function() {
      const x = Variable.create('x');
      assert.instanceOf(x, Variable);
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

  });
});
