const assert = require('chai').assert

const Variable = require('../src/js/Types/Variable');
const Symbl    = require('../src/js/Types/Symbl');
const Lambda   = require('../src/js/Types/Lambda');
const Apply    = require('../src/js/Types/Apply');

const Func = require('../src/js/Types/Func');

const { UnlambdaStyleParser } = require('../src/js/Parser/UnlambdaStyleParser')


describe('UnlambdaStyleParser', function () {
  describe('変数のパーズ', function() {
    it('1文字変数のパーズ', function () {
      const src = 'x';
      const parseResult = UnlambdaStyleParser.variable.parse(src);

      assert.instanceOf(parseResult.value, Variable);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Variable('x'),
        }
      );
    });

    it('複数文字変数のパーズ', function() {
      const src = 'PLUS';
      const parseResult = UnlambdaStyleParser.variable.parse(src);

      assert.instanceOf(parseResult.value, Variable);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Variable('PLUS'),
        }
      );
    });

    it('数字のみの変数名も可', function() {
      const src = '42';
      const parseResult = UnlambdaStyleParser.variable.parse(src);

      assert.instanceOf(parseResult.value, Variable);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Variable('42'),
        }
      );
    });

    it('アンダースコア単体でも変数名として認められる', function() {
      const src = '_';
      const parseResult = UnlambdaStyleParser.variable.parse(src);

      assert.instanceOf(parseResult.value, Variable);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Variable('_'),
        }
      );
    });
  });

  describe('シンボルのパーズ', function() {
    it(':から始まるトークンはシンボルを作る', function() {
      const src = ':x';
      const parseResult = UnlambdaStyleParser.symbl.parse(src);

      assert.instanceOf(parseResult.value, Symbl);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Symbl('x'),
        }
      );
    });

    it('複数文字のシンボルもある', function() {
      const src = ':PLUS';
      const parseResult = UnlambdaStyleParser.symbl.parse(src);

      assert.instanceOf(parseResult.value, Symbl);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Symbl('PLUS'),
        }
      );
    });
  });

  describe('適用式のパーズ', function() {
    it('単純な適用', function () {
      const src = '`xy';
      const parseResult = UnlambdaStyleParser.apply.parse(src);

      assert.instanceOf(parseResult.value, Apply);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Apply(
            new Variable('x'),
            new Variable('y'),
          ),
        }
      );
    });

    it('適用のネスト', function () {
      const src = '``xz`yz';
      const parseResult = UnlambdaStyleParser.apply.parse(src);

      assert.instanceOf(parseResult.value, Apply);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Apply(
            new Apply(
              new Variable('x'),
              new Variable('z')
            ),
            new Apply(
              new Variable('y'),
              new Variable('z')
            )
          ),
        }
      );
    });

    it('識別子の間にスペースを差し込んでも構わない', function () {
      const src = '   ` `   x z  ` y  z   ';
      const parseResult = UnlambdaStyleParser.apply.parse(src);

      assert.instanceOf(parseResult.value, Apply);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: new Apply(
            new Apply(
              new Variable('x'),
              new Variable('z')
            ),
            new Apply(
              new Variable('y'),
              new Variable('z')
            )
          ),
        }
      );
    });
  });

  describe('関数定義', function() {
    it('関数定義の左辺値', function() {
      const src = '```fxyz';
      const parseResult = UnlambdaStyleParser.lvalue.parse(src);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: [
            'f',
            ['x', 'y', 'z'],
          ]
        }
      );
    });

    it('左辺値にもスペースでレイアウトを調整することが許される', function() {
      const src = '  ` ``  f    x y z     ';
      const parseResult = UnlambdaStyleParser.lvalue.parse(src);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: [
            'f',
            ['x', 'y', 'z'],
          ]
        }
      );
    });

    it('全ての式が左辺値になれる訳ではない', function() {
      const src = '``fx`fz';
      const parseResult = UnlambdaStyleParser.lvalue.parse(src);

      assert.isNotOk(parseResult.status);
    });

    it('関数定義', function() {
      const src = '``fxy=`yx';
      const parseResult = UnlambdaStyleParser.def.parse(src);

      assert.isString(parseResult.value[0]);
      assert.instanceOf(parseResult.value[1], Func);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: [
            'f',
            new Func(
              /* params = */ ['x', 'y'],
              /* bareExpr = */ new Apply(
                new Variable('y'),
                new Variable('x')
              )
            ),
          ]
        }
      );
    });

    it('左辺値が不正ならば関数定義全体も不正', function() {
      const src = '``fx`fz=x';
      const parseResult = UnlambdaStyleParser.def.parse(src);

      assert.isNotOk(parseResult.status);
    });

    it('関数定義もスペースの挿入は自由', function() {
      const src = '   `` f x y = `y   x  ';
      const parseResult = UnlambdaStyleParser.def.parse(src);

      assert.isString(parseResult.value[0]);
      assert.instanceOf(parseResult.value[1], Func);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: [
            'f',
            new Func(
              /* params = */ ['x', 'y'],
              /* bareExpr = */ new Apply(
                new Variable('y'),
                new Variable('x')
              )
            ),
          ]
        }
      );
    });
  });
});
