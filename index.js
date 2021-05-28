'use strict';

const createModule = require('./build/MoneroCoreJS');

class MoneroCoreJS {
	constructor(Module) {
    this.Module = Module;
	}
  createTx(data) {
    return this._run('createTx', [JSON.stringify(data)]);
  }
  _run(method, args) {
    try {
      return this.Module[method].apply(this.Module, args);
    } catch (exception) {
      let message = 'MoneroCoreJS wasm error';
      try {
        message = this.Module.getExceptionMessage(exception);
      } catch (err) {}
      throw new Error(message);
    }
  }
}

function init(wasmPath = '') {
  const options = {};
  if (wasmPath) {
    options.locateFile = () => wasmPath;
  }
  return createModule(options).then((Module) => {
    const instance = new MoneroCoreJS(Module);
    return instance;
  }).catch(function(err) {
    console.error('Error loading MoneroCoreJS:', err);
    throw err;
  });
}

module.exports = init;
