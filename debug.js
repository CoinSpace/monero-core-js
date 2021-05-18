const initMoneroCoreJs = require('./index.js');

async function run() {
  // moneroCoreJs = await initMoneroCoreJs('./build/MyMoneroCoreCpp_WASM.wasm');
  moneroCoreJs = await initMoneroCoreJs();
  // debug something
  console.log(moneroCoreJs.hello('world'));
}

run();
