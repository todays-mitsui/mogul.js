const assert = require('chai').assert;

const { Parser } = require('../src/js/Parser/ES6FatArrowStyleParser');

const Context = require('../src/js/Context/Context');
const Mogul   = require('../src/js/Mogul');

describe('Mogul', function () {
  it('defaultContext', function() {
    const mogul = new Mogul();

    assert.instanceOf(mogul.defaultContext, Context);
  });

  it('defaultContext', function() {
    assert.deepEqual(
      Parser.params.parse('x'),
      {}
    );
  });
});
