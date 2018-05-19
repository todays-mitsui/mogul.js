const { Record, Map } = require('immutable');

const ContextRecord = Record({
  store: Map(),
})

class Context extends ContextRecord {
  constructor(funcNameAndFuncs) {
    super({
      store: Map(funcNameAndFuncs),
    })
  }

  /**
   * @param  {string} funcName
   * @return {bool}
   */
  _has(funcName) {
    return super.get('store').has(funcName);
  }

  /**
   * @param   {string} funcName
   * @returns {Func}
   */
  _get(funcName) {
    return super.get('store').get(funcName);
  }

  /**
   * @param  {string}  funcName
   * @param  {Func}    func
   * @return {Context}
   */
  _add(funcName, func) {
    return this.update('store', store => store.set(funcName, func));
  }

  /**
   * @param  {string} funcName
   * @return {Context}
   */
  _delete(funcName) {
    return this.update('store', store => store.delete(funcName));
  }

  _toJS() {
    return this.get('store').toJS();
  }
}

module.exports = Context;
