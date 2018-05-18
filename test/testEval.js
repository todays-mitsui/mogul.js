const assert = require('chai').assert;

const Expr    = require('../src/js/Types/Expr');
const Func    = require('../src/js/Types/Func');
const Context = require('../src/js/Context/Context');
const Eval    = require('../src/js/Eval');

describe('Eval', function () {
  const context = (new Context())
    ._add('i', new Func(['x'], Expr.var('x')))
    ._add('k', new Func(['x', 'y'], Expr.var('x')))
    ._add('s', new Func(
      ['x', 'y', 'z'],
      Expr.var('x')
        .apply(Expr.var('z'))
        .apply(Expr.var('y').apply(Expr.var('z')))
    ));

  describe('reduce', function() {
    it('```skk:x // 基本の skk', function() {
      const expr = Expr.com('s')
        .apply(Expr.com('k'))
        .apply(Expr.com('k'))
        .apply(Expr.sym('x'));

      assert.isTrue((new Eval(context, expr)).reduce().equals(
        Expr.com('k')
          .apply(Expr.sym('x'))
          .apply(Expr.com('k').apply(Expr.sym('x')))
      ));
    });

    it('``sk:x // 簡約基を持たない場合は null が返る', function() {
      const expr = Expr.com('s')
        .apply(Expr.com('k'))
        .apply(Expr.sym('x'));

      assert.isNull((new Eval(context, expr)).reduce());
    });

    it('``s`i:x`k // 最外簡約できない場合は内簡約を試みる', function() {
      const expr = Expr.com('s')
        .apply(Expr.com('i').apply(Expr.sym('x')))
        .apply(Expr.com('k'));

      assert.isTrue((new Eval(context, expr)).reduce().equals(
        Expr.com('s')
          .apply(Expr.sym('x'))
          .apply(Expr.com('k'))
      ));
    });

    it('``s`i:x`ik // 簡約基を複数持つ場合はもっとも左にある一つのみを簡約する', function() {
      const expr = Expr.com('s')
        .apply(Expr.com('i').apply(Expr.sym('x')))
        .apply(Expr.com('i').apply(Expr.com('k')));

      assert.isTrue((new Eval(context, expr)).reduce().equals(
        Expr.com('s')
          .apply(Expr.sym('x'))
          .apply(Expr.com('i').apply(Expr.com('k')))
      ));
    });
  });

  describe('sequence', function() {
    it('```skk:x', function() {
      const expr = Expr.com('s')
        .apply(Expr.com('k'))
        .apply(Expr.com('k'))
        .apply(Expr.sym('x'));

      const iter = (new Eval(context, expr)).sequence();

      for (let reduced of iter) {
        assert.instanceOf(reduced, Expr);
      }
    });

    it('```skk:x', function() {
      const expr = Expr.com('s')
        .apply(Expr.com('k'))
        .apply(Expr.com('k'))
        .apply(Expr.sym('x'));

      const iter = (new Eval(context, expr)).sequence();

      assert.lengthOf(Array.from(iter), 2);
    });
  });
});
