const assert = require('chai').assert

const Identifier = require('../src/js/Types/Identifier');
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
  it('``xz`yz', function() {
    const src = '``xz`yz';
    const expr = parseExpr(src);

    assert.instanceOf(expr, Expr);

    assert.isOk(expr.equals(
      Expr.com('x')
        .apply(Expr.com('z'))
        .apply(Expr.com('y').apply(Expr.com('z')))
    ));
  });

  it('^x.`yx', function() {
    const src = '^x.`yx';
    const expr = parseExpr(src);

    assert.instanceOf(expr, Expr);

    assert.isOk(expr.equals(
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

    assert.isOk(expr.equals(
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

    assert.isOk(expr.equals(
      Expr.lambda('x', Expr.var('x')).apply(Expr.sym('s'))
    ));
  });
});

describe('parseDefs', function () {
  it('`ix=x', function() {
    const src = '`ix=x';
    const context = parseDefs(src);

    assert.isOk(context.has('i'));
    assert.isOk(context.get('i').equals(
      new Func(
        [
          new Identifier('x'),
        ],
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

    assert.isOk(context.has('s'));
    assert.isOk(context.get('s').equals(
      new Func(
        [
          new Identifier('x'),
          new Identifier('y'),
          new Identifier('z'),
        ],
        Expr.var('x')
          .apply(Expr.var('z'))
          .apply(Expr.var('y').apply(Expr.var('z')))
      )
    ));

    assert.isOk(context.has('i'));
    assert.isOk(context.get('i').equals(
      new Func(
        [
          new Identifier('x'),
        ],
        Expr.var('x')
      )
    ));

    assert.isOk(context.has('k'));
    assert.isOk(context.get('k').equals(
      new Func(
        [
          new Identifier('x'),
          new Identifier('y'),
        ],
        Expr.var('x')
      )
    ));
  });
});
