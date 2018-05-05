const assert = require('chai').assert

const Variable   = require('../src/js/Types/Variable');
const Combinator = require('../src/js/Types/Combinator');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');


describe('PrettyPrint', function() {
  describe('UnlambdaStylePrettyPrint', function() {
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

  describe('ES6FatArrowStylePrettyPrinter', function() {
    it('x=>y=>z=>x(z)(y(z))', function() {
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

      const prettyPrinter = require('../src/js/PrettyPrinter/ES6FatArrowStylePrettyPrinter');
      Expr.PRETTY_PRINTER = prettyPrinter;

      assert.equal(expr.pp(), 'x=>y=>z=>x(z)(y(z))');
    });

    it('(x=>x)(y)', function() {
      const expr = (new Lambda('x', Expr.var('x'))).apply(Expr.com('y'));

        const prettyPrinter = require('../src/js/PrettyPrinter/ES6FatArrowStylePrettyPrinter');
        Expr.PRETTY_PRINTER = prettyPrinter;

      assert.equal(expr.pp(), '(x=>x)(y)');
    });
  });

  describe('ES5FunctionStylePrettyPrinter', function() {
    it('function(x){return function(y){return function(z){return x(z)(y(z));};};}', function() {
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

      const prettyPrinter = require('../src/js/PrettyPrinter/ES5FunctionStylePrettyPrinter');
      Expr.PRETTY_PRINTER = prettyPrinter;

      assert.equal(expr.pp(), 'function(x){return function(y){return function(z){return x(z)(y(z));};};}');
    });

    it('(function(x){return x;})(y)', function() {
      const expr = (new Lambda('x', Expr.var('x'))).apply(Expr.com('y'));

        const prettyPrinter = require('../src/js/PrettyPrinter/ES5FunctionStylePrettyPrinter');
        Expr.PRETTY_PRINTER = prettyPrinter;

      assert.equal(expr.pp(), '(function(x){return x;})(y)');
    });
  });

  describe('HaskellStylePrettyPrinter', function() {
    it('\\x y z->x z (y z)', function() {
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

      const prettyPrinter = require('../src/js/PrettyPrinter/HaskellStylePrettyPrinter');
      Expr.PRETTY_PRINTER = prettyPrinter;

      assert.equal(expr.pp(), '\\x y z->x z (y z)');
    });

    it('(\\x->x) y', function() {
      const expr = (new Lambda('x', Expr.var('x'))).apply(Expr.com('y'));

        const prettyPrinter = require('../src/js/PrettyPrinter/HaskellStylePrettyPrinter');
        Expr.PRETTY_PRINTER = prettyPrinter;

      assert.equal(expr.pp(), '(\\x->x) y');
    });
  });
});
