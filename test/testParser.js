const assert = require('chai').assert

const Variable   = require('../src/js/Types/Variable');
const Combinator = require('../src/js/Types/Combinator');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');

const Func = require('../src/js/Types/Func');

const parseExpr = require('../src/js/Parser/Parser').parseExpr;
const parseDefs = require('../src/js/Parser/Parser').parseDefs;


describe('parseExpr', function () {
  describe('パーズ成功', function() {
    it('``xz`yz', function() {
      const src = '``xz`yz';
      const expr = parseExpr(src);

      assert.instanceOf(expr, Expr);

      assert.isTrue(expr.equals(
        Expr.com('x')
          .apply(Expr.com('z'))
          .apply(Expr.com('y').apply(Expr.com('z')))
      ));
    });

    it('^x.`yx', function() {
      const src = '^x.`yx';
      const expr = parseExpr(src);

      assert.instanceOf(expr, Expr);

      assert.isTrue(expr.equals(
        Expr.lambda(
          'x',
          Expr.com('y').apply(Expr.var('x'))
        )
      ));
    });

    it('^x.^y.`yx', function() {
      const src = '^x.^y.`yx';
      const expr = parseExpr(src);

      assert.instanceOf(expr, Expr);

      assert.isTrue(expr.equals(
        Expr.lambda(
          'x',
          Expr.lambda(
            'y',
            Expr.var('y').apply(Expr.var('x'))
          )
        )
      ));
    });

    it('`^x.x:s', function() {
      const src = '`^x.x:s';
      const expr = parseExpr(src);

      assert.instanceOf(expr, Expr);

      assert.isTrue(expr.equals(
        Expr.lambda('x', Expr.var('x')).apply(Expr.sym('s'))
      ));
    });
  });

  describe('パーズ失敗', function() {
    it('`xz`yz', function() {
      const src = '`xz`yz';

      assert.throws(function() {
        const expr = parseExpr(src);
      }, Error);
    });
  });
});

describe('parseDefs', function () {
  describe('パーズ成功', function() {
    it('`ix=x', function() {
      const src = '`ix=x';
      const context = parseDefs(src);

      assert.isTrue(context.has('i'));
      assert.isTrue(context.get('i').equals(
        new Func(
          ['x'],
          Expr.var('x')
        )
      ));
    });

    it('s,k,i', function() {
      const src = [
        '```sxyz=``xz`yz',
        '``kxy=x',
        '`ix=x',
      ].join('\n');
      const context = parseDefs(src);

      assert.isTrue(context.has('s'));
      assert.isTrue(context.get('s').equals(
        new Func(
          ['x', 'y', 'z'],
          Expr.var('x')
            .apply(Expr.var('z'))
            .apply(Expr.var('y').apply(Expr.var('z')))
        )
      ));

      assert.isTrue(context.has('i'));
      assert.isTrue(context.get('i').equals(
        new Func(
          ['x'],
          Expr.var('x')
        )
      ));

      assert.isTrue(context.has('k'));
      assert.isTrue(context.get('k').equals(
        new Func(
          ['x', 'y'],
          Expr.var('x')
        )
      ));
    });
  });
});
