const assert = require('chai').assert;

const Expr = require('../src/js/Types/Expr');
const Func = require('../src/js/Types/Func');

describe('Func', function () {
  describe('invoke', function() {
    it('```sabc => ``ac`bc', function() {
      const s = new Func(
        ['x', 'y', 'z'],
        Expr.var('x')
          .apply(Expr.var('z'))
          .apply(Expr.var('y').apply(Expr.var('z')))
      );

      const a = Expr.com('a');
      const b = Expr.com('b');
      const c = Expr.com('c');

      assert.isTrue(s.invoke(a, b, c).equals(
        a.apply(c).apply(b.apply(c))
      ));
    });
  });
});
