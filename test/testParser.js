const assert = require('chai').assert

const Identifier = require('../src/js/Types/Identifier');
const Variable   = require('../src/js/Types/Variable');
const Combinator = require('../src/js/Types/Combinator');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');

const parse = require('../src/js/Parser/parse')


describe('parse', function () {
  it('``xz`yz', function() {
    const src = '``xz`yz';
    const expr = parse(src);

    assert.instanceOf(expr, Expr);

    assert.isOk(expr.equals(
      Expr.com('x')
        .apply(Expr.com('z'))
        .apply(Expr.com('y').apply(Expr.com('z')))
    ));
  });

  it('^x.`yx', function() {
    const src = '^x.`yx';
    const expr = parse(src);

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
    const expr = parse(src);

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
    const expr = parse(src);

    assert.instanceOf(expr, Expr);

    assert.isOk(expr.equals(
      Expr.lambda('x', Expr.var('x')).apply(Expr.sym('s'))
    ));
  });
});
