'use strict';

const createModule = require('./build/MoneroCoreJS');

class MoneroCoreJS {
	constructor(Module) {
    this.Module = Module;
	}
  hello(message) {
    return this.Module.hello(message);
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
