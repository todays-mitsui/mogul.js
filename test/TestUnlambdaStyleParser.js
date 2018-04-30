const assert = require('chai').assert

const Identifier = require('../src/js/Types/Identifier');
const Variable = require('../src/js/Types/Variable');
const Symbl = require('../src/js/Types/Symbl');
const Lambda = require('../src/js/Types/Lambda');
const Apply = require('../src/js/Types/Apply');

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
});
