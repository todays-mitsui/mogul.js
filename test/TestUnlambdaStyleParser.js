const assert = require('chai').assert
const UnlambdaStyleParser = require('../src/js/Parser/UnlambdaStyleParser')


describe('UnlambdaStyleParser', function () {
  describe('変数のパーズ', function() {
    it('1文字変数のパーズ', function () {
      const src = 'x';

      assert.deepEqual(
        UnlambdaStyleParser.variable.parse(src),
        {
          status: true,
          value: { type: 'variable', label: 'x' },
        }
      );
    });

    it('複数文字変数のパーズ', function() {
      const src = 'PLUS';

      assert.deepEqual(
        UnlambdaStyleParser.variable.parse(src),
        {
          status: true,
          value: { type: 'variable', label: 'PLUS' },
        }
      );
    });

    it('数字のみの変数名も可', function() {
      const src = '42';

      assert.deepEqual(
        UnlambdaStyleParser.variable.parse(src),
        {
          status: true,
          value: { type: 'variable', label: '42' },
        }
      );
    });

    it('アンダースコア単体でも変数名として認められる', function() {
      const src = '_';

      assert.deepEqual(
        UnlambdaStyleParser.variable.parse(src),
        {
          status: true,
          value: { type: 'variable', label: '_' },
        }
      );
    });
  });

  describe('シンボルのパーズ', function() {
    it(':から始まるトークンはシンボルを作る', function() {
      const src = ':x';

      assert.deepEqual(
        UnlambdaStyleParser.symbol.parse(src),
        {
          status: true,
          value: { type: 'symbol', label: 'x' },
        }
      );
    });

    it('複数文字のシンボルもある', function() {
      const src = ':PLUS';

      assert.deepEqual(
        UnlambdaStyleParser.symbol.parse(src),
        {
          status: true,
          value: { type: 'symbol', label: 'PLUS' },
        }
      );
    });
  });

  describe('適用式のパーズ', function() {
    it('単純な適用', function () {
      const src = '`xy';

      assert.deepEqual(
        UnlambdaStyleParser.apply.parse(src),
        {
          status: true,
          value: {
            type: 'apply',
            left: { type: 'variable', label: 'x' },
            right: { type: 'variable', label: 'y' },
          },
        }
      );
    });

    it('適用のネスト', function () {
      const src = '``xz`yz';

      assert.deepEqual(
        UnlambdaStyleParser.apply.parse(src),
        {
          status: true,
          value: {
            type: 'apply',
            left: {
              type: 'apply',
              left: { type: 'variable', label: 'x' },
              right: { type: 'variable', label: 'z' },
            },
            right: {
              type: 'apply',
              left: { type: 'variable', label: 'y' },
              right: { type: 'variable', label: 'z' },
            },
          },
        }
      );
    });
  });
});
