const assert = require('chai').assert

const Identifier = require('../src/js/Types/Identifier');
const Variable   = require('../src/js/Types/Variable');
const Symbl      = require('../src/js/Types/Symbl');
const Lambda     = require('../src/js/Types/Lambda');
const Apply      = require('../src/js/Types/Apply');

const Func       = require('../src/js/Types/Func');

const UnlambdaStyleParser = require('../src/js/Parser/UnlambdaStyleParser')


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
          value: new Variable(new Identifier('x')),
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
          value: new Variable(new Identifier('PLUS')),
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
          value: new Variable(new Identifier('42')),
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
          value: new Variable(new Identifier('_')),
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
          value: new Symbl(new Identifier('x')),
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
          value: new Symbl(new Identifier('PLUS')),
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
            new Variable(new Identifier('x')),
            new Variable(new Identifier('y')),
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
              new Variable(new Identifier('x')),
              new Variable(new Identifier('z'))
            ),
            new Apply(
              new Variable(new Identifier('y')),
              new Variable(new Identifier('z'))
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
            new Identifier('f'),
            [
              new Identifier('x'),
              new Identifier('y'),
              new Identifier('z'),
            ],
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

      assert.instanceOf(parseResult.value[0], Identifier);
      assert.instanceOf(parseResult.value[1], Func);

      assert.deepEqual(
        parseResult,
        {
          status: true,
          value: [
            new Identifier('f'),
            new Func(
              /* params = */ [
                new Identifier('x'),
                new Identifier('y'),
              ],
              /* bareExpr = */ new Apply(
                new Variable(new Identifier('y')),
                new Variable(new Identifier('x'))
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
  });
});
