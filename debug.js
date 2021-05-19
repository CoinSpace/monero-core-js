const initMoneroCoreJs = require('./index.js');

async function run() {
  // moneroCoreJs = await initMoneroCoreJs('./build/MoneroCoreJS.wasm');
  moneroCoreJs = await initMoneroCoreJs();
  // debug something
  console.log(moneroCoreJs.hello('world'));
}

run();
