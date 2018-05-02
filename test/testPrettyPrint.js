const assert = require('chai').assert

const Variable   = require('../src/js/Types/Variable');
const Combinator = require('../src/js/Types/Combinator');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');


describe('PrettyPrint', function() {
  it('^x.^y.^z.``xz`yz', function() {
    const expr = new Lambda(
      'x',
      new Lambda(
        'y',
        new Lambda(
          'z',
          Expr.var('x')
            .apply(Expr.var('z'))
            .apply(Expr.var('y').apply(Expr.var('z')))
        )
      )
    );

    const prettyPrinter = require('../src/js/PrettyPrinter/UnlambdaStylePrettyPrinter');
    Expr.PRETTY_PRINTER = prettyPrinter;

    assert.equal(expr.pp(), '^x.^y.^z.``xz`yz');
  });

  it('``FOO BAR BUZ', function() {
    const expr = Expr.var('FOO')
      .apply(Expr.var('BAR'))
      .apply(Expr.var('BUZ'));

      const prettyPrinter = require('../src/js/PrettyPrinter/UnlambdaStylePrettyPrinter');
      Expr.PRETTY_PRINTER = prettyPrinter;

    assert.equal(expr.pp(), '``FOO BAR BUZ');
  });

  it('``FOOx`BARy', function() {
    const expr = Expr.var('FOO')
      .apply(Expr.var('x'))
      .apply(Expr.var('BAR').apply(Expr.var('y')));

      const prettyPrinter = require('../src/js/PrettyPrinter/UnlambdaStylePrettyPrinter');
      Expr.PRETTY_PRINTER = prettyPrinter;

    assert.equal(expr.pp(), '``FOOx`BARy');
  });
});
