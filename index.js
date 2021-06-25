'use strict';

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

async function init(wasmPath, forceAsm) {
  let createModule;
  if (typeof WebAssembly === 'object' && !forceAsm) {
    createModule = (await import('./build/MoneroCoreJS.js')).default;
  } else {
    createModule = (await import('./build/MoneroCoreJS.asm.js')).default;
  }
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
