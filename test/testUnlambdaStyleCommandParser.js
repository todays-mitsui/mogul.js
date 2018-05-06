const assert = require('chai').assert

const Expr = require('../src/js/Types/Expr');
const Func = require('../src/js/Types/Func');

const { UnlambdaStyleCommandParser } = require('../src/js/Parser/UnlambdaStyleParser')


describe('UnlambdaStyleCommandParser', function () {
  describe('eval', function() {
    it('```skk:x', function() {
      const src = '```skk:x';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'eval',
            expr: Expr.com('s')
              .apply(Expr.com('k'))
              .apply(Expr.com('k'))
              .apply(Expr.sym('x'))
          },
        }
      );
    });
  });

  describe('evalLast', function() {
    it('!```skk:x', function() {
      const src = '!```skk:x';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'evalLast',
            expr: Expr.com('s')
              .apply(Expr.com('k'))
              .apply(Expr.com('k'))
              .apply(Expr.sym('x'))
          },
        }
      );
    });

    it('! ```skk:x', function() {
      const src = '! ```skk:x';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'evalLast',
            expr: Expr.com('s')
              .apply(Expr.com('k'))
              .apply(Expr.com('k'))
              .apply(Expr.sym('x'))
          },
        }
      );
    });
  });

  describe('evalHead', function() {
    it(':10 ```skk:x', function() {
      const src = ':10 ```skk:x';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'evalHead',
            expr: Expr.com('s')
              .apply(Expr.com('k'))
              .apply(Expr.com('k'))
              .apply(Expr.sym('x'))
            ,
            howMany: 10,
          },
        }
      );
    });
  });

  describe('evalTail', function() {
    it(':-10 ```skk:x', function() {
      const src = ':-10 ```skk:x';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'evalTail',
            expr: Expr.com('s')
              .apply(Expr.com('k'))
              .apply(Expr.com('k'))
              .apply(Expr.sym('x'))
            ,
            howMany: 10,
          },
        }
      );
    });
  });

  describe('info', function() {
    it('?s', function() {
      const src = '?s';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'info',
            ident: 's',
          },
        }
      );
    });

    it('? s', function() {
      const src = '? s';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'info',
            ident: 's',
          },
        }
      );
    });

    it('?``skk', function() {
      const src = '?``skk';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.isFalse(parseResult.status);
    });

    it('?sk', function() {
      const src = '?sk';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.isFalse(parseResult.status);
    });
  });

  describe('context', function() {
    it('?', function() {
      const src = '?';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'context',
          },
        }
      );
    });
  });

  describe('add', function() {
    it('```sxyz := ``xz`yz', function() {
      const src = '```sxyz := ``xz`yz';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'add',
            funcName: 's',
            func: new Func(
              ['x', 'y', 'z'],
              Expr.var('x')
                .apply(Expr.var('z'))
                .apply(Expr.var('y').apply(Expr.var('z')))
            ),
          },
        }
      );
    });
  });

  describe('update', function() {
    it('```sxyz = ``xz`yz', function() {
      const src = '```sxyz = ``xz`yz';
      const parseResult = UnlambdaStyleCommandParser.command.parse(src);

      assert.instanceOf(parseResult.value, Object);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: {
            command: 'update',
            funcName: 's',
            func: new Func(
              ['x', 'y', 'z'],
              Expr.var('x')
                .apply(Expr.var('z'))
                .apply(Expr.var('y').apply(Expr.var('z')))
            ),
          },
        }
      );
    });
  });
});
