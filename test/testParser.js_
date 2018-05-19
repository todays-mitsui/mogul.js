const assert = require('chai').assert

const Variable   = require('../src/js/Types/Variable');
const Combinator = require('../src/js/Types/Combinator');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');
const Expr       = require('../src/js/Types/Expr');

const Func = require('../src/js/Types/Func');

const { parseExpr } = require('../src/js/Parser/Parser');
const { parseDefs } = require('../src/js/Parser/Parser');
const { parseCommand } = require('../src/js/Parser/Parser');


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

      assert.isTrue(context._has('i'));
      assert.isTrue(context._get('i').equals(
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

      assert.isTrue(context._has('s'));
      assert.isTrue(context._get('s').equals(
        new Func(
          ['x', 'y', 'z'],
          Expr.var('x')
            .apply(Expr.var('z'))
            .apply(Expr.var('y').apply(Expr.var('z')))
        )
      ));

      assert.isTrue(context._has('i'));
      assert.isTrue(context._get('i').equals(
        new Func(
          ['x'],
          Expr.var('x')
        )
      ));

      assert.isTrue(context._has('k'));
      assert.isTrue(context._get('k').equals(
        new Func(
          ['x', 'y'],
          Expr.var('x')
        )
      ));
    });
  });
});


describe('parseCommand', function () {
  describe('eval', function() {
    it('```skk:x', function() {
      const src = '```skk:x';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'eval',
          expr: Expr.com('s')
            .apply(Expr.com('k'))
            .apply(Expr.com('k'))
            .apply(Expr.sym('x'))
          ,
        }
      );

      assert.isTrue(parseResult.expr.equals(
        Expr.com('s')
          .apply(Expr.com('k'))
          .apply(Expr.com('k'))
          .apply(Expr.sym('x'))
      ));
    });
  });

  describe('evalLast', function() {
    it('!```skk:x', function() {
      const src = '!```skk:x';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'evalLast',
          expr: Expr.com('s')
            .apply(Expr.com('k'))
            .apply(Expr.com('k'))
            .apply(Expr.sym('x'))
          ,
        }
      );

      assert.isTrue(parseResult.expr.equals(
        Expr.com('s')
          .apply(Expr.com('k'))
          .apply(Expr.com('k'))
          .apply(Expr.sym('x'))
      ));
    });

    it('! ```skk:x', function() {
      const src = '! ```skk:x';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'evalLast',
          expr: Expr.com('s')
            .apply(Expr.com('k'))
            .apply(Expr.com('k'))
            .apply(Expr.sym('x'))
          ,
        }
      );
    });
  });

  describe('evalHead', function() {
    it(':10 ```skk:x', function() {
      const src = ':10 ```skk:x';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'evalHead',
          expr: Expr.com('s')
            .apply(Expr.com('k'))
            .apply(Expr.com('k'))
            .apply(Expr.sym('x'))
          ,
          howMany: 10,
        }
      );

      assert.isTrue(parseResult.expr.equals(
        Expr.com('s')
          .apply(Expr.com('k'))
          .apply(Expr.com('k'))
          .apply(Expr.sym('x'))
      ));
    });
  });

  describe('evalTail', function() {
    it(':-10 ```skk:x', function() {
      const src = ':-10 ```skk:x';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'evalTail',
          expr: Expr.com('s')
            .apply(Expr.com('k'))
            .apply(Expr.com('k'))
            .apply(Expr.sym('x'))
          ,
          howMany: 10,
        }
      );

      assert.isTrue(parseResult.expr.equals(
        Expr.com('s')
          .apply(Expr.com('k'))
          .apply(Expr.com('k'))
          .apply(Expr.sym('x'))
      ));
    });
  });

  describe('info', function() {
    it('?s', function() {
      const src = '?s';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'info',
          ident: 's',
        }
      );
    });

    it('? s', function() {
      const src = '? s';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'info',
          ident: 's',
        }
      );
    });

    it('?``skk', function() {
      const src = '?``skk';

      assert.throws(() => {
        parseCommand(src)
      });
    });

    it('?sk', function() {
      const src = '?sk';

      assert.throws(() => {
        parseCommand(src)
      });
    });
  });

  describe('context', function() {
    it('?', function() {
      const src = '?';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'context',
        }
      );
    });
  });

  describe('add', function() {
    it('```sxyz := ``xz`yz', function() {
      const src = '```sxyz := ``xz`yz';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'add',
          funcName: 's',
          func: new Func(
            ['x', 'y', 'z'],
            Expr.var('x')
              .apply(Expr.var('z'))
              .apply(Expr.var('y').apply(Expr.var('z')))
          ),
        }
      );
    });
  });

  describe('update', function() {
    it('```sxyz = ``xz`yz', function() {
      const src = '```sxyz = ``xz`yz';
      const parseResult = parseCommand(src);

      assert.deepEqual(
        parseResult,
        {
          command: 'update',
          funcName: 's',
          func: new Func(
            ['x', 'y', 'z'],
            Expr.var('x')
              .apply(Expr.var('z'))
              .apply(Expr.var('y').apply(Expr.var('z')))
          ),
        }
      );
    });
  });
});
