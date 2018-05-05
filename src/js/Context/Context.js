class Context {
  constructor() {
    this._store = new Map([]);
  }

  /**
   * @param   {string} funcName
   * @returns {bool}
   */
  has(funcName) {

  }

  /**
   * @param   {string} funcName
   * @returns {Func}
   */
  get(funcName) {
    return this._store.get(funcName);
  }

  /**
   * @param   {string}  funcName
   * @param   {Func}    func
   * @returns {Context}
   */
  set(funcName, func) {
    this._store = this._store.set(funcName, func);

    return this;
  }

  /**
   * @returns {Array[]}
   */
  entries() {
    return Array.from(this._store);
  }
}

module.exports = Context;
