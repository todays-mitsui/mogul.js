const assert = require('chai').assert;

const Expr = require('../src/js/Types/Expr');

const Location = require('../src/js/Location');

describe('Location', function() {
  describe('popRightTrees', function() {
    it('goLeft() した後に rightTrees を取り出す', function() {
      const s = Expr.com('s');
      const k = Expr.com('k');
      const i = Expr.com('i');

      const location = Location.root.goLeft(s).goLeft(k).goLeft(i);

      const [rightTrees, newLocation] = location.popRightTrees(3);

      assert.lengthOf(rightTrees, 3);

      assert.isTrue(rightTrees[0].equals(i));
      assert.isTrue(rightTrees[1].equals(k));
      assert.isTrue(rightTrees[2].equals(s));
    });

    it('goLeft() した回数よりも長い rightTrees は取り出せない', function() {
      const s = Expr.com('s');
      const k = Expr.com('k');
      const i = Expr.com('i');

      const location = Location.root.goLeft(s).goLeft(k).goLeft(i);

      assert.throws(() => {
        location.popRightTrees(10);
      });
    });

    it('goRight() した直後にも rightTrees は取り出せない', function() {
      const s = Expr.com('s');
      const k = Expr.com('k');
      const i = Expr.com('i');
      const x = Expr.var('x');

      const location = Location.root.goLeft(s).goLeft(k).goLeft(i).goRight(x);

      assert.throws(() => {
        location.popRightTrees(10);
      });
    });
  });

  describe('reassemble', function() {
    it('goLeft(), goRight(), reassemble() は元のλ式の情報を完全に保持する', function() {
      const s = Expr.com('s');
      const k = Expr.com('k');
      const i = Expr.com('i');
      const x = Expr.var('x');

      const location = Location.root.goLeft(s).goRight(k).goLeft(i);

      assert.isTrue(location.reassemble(x).equals(
        k.apply(x.apply(i)).apply(s)
      ));
    });
  });
});
