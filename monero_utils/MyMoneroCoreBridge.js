const MyMoneroCoreBridgeClass = require('./MyMoneroCoreBridgeClass')
//
module.exports = function(options)
{
	options = options || {}

  const ENVIRONMENT_IS_WEB = typeof window==="object";
  const ENVIRONMENT_IS_WORKER = typeof importScripts==="function";
  const ENVIRONMENT_IS_NODE = typeof process==="object" && process.browser !== true && typeof require==="function" && ENVIRONMENT_IS_WORKER == false;
	//
	function locateFile(filename, scriptDirectory)
	{
		// if (options["locateFile"]) {
		// 	return options["locateFile"](filename, scriptDirectory)
		// }
		var this_scriptDirectory = scriptDirectory
		const lastChar = this_scriptDirectory.charAt(this_scriptDirectory.length - 1)
		if (lastChar == "/" || lastChar == "\\") {
			// ^-- this is not a '\\' on Windows because emscripten actually appends a '/'
			this_scriptDirectory = this_scriptDirectory.substring(0, this_scriptDirectory.length - 1) // remove trailing "/"
		}
		var fullPath = null; // add trailing slash to this
		if (ENVIRONMENT_IS_NODE) {
			const path = require('path')
			const lastPathComponent = path.basename(this_scriptDirectory)
			if (lastPathComponent == "monero_utils") { // typical node or electron-main process
				fullPath = path.format({
					dir: this_scriptDirectory,
					base: filename
				})
			} else {
				console.warn(`MyMoneroCoreBridge/locateFile() on node.js didn't find "monero_utils" (or possibly MyMoneroCoreBridge.js) itself in the expected location in the following path. The function may need to be expanded but it might in normal situations be likely to be another bug. ${pathTo_cryptonoteUtilsDir}`)
			}
		} else if (ENVIRONMENT_IS_WEB) {
			var pathTo_cryptonoteUtilsDir;
			if (typeof __dirname !== undefined && __dirname !== "/") { // looks like node running in browser.. (but not going to assume it's electron-renderer since that should be taken care of by monero_utils.js itself)
				// but just in case it is... here's an attempt to support it
				// have to check != "/" b/c webpack (I think) replaces __dirname
				pathTo_cryptonoteUtilsDir = "file://" + __dirname + "/" // prepending "file://" because it's going to try to stream it
			} else { // actual web browser
				pathTo_cryptonoteUtilsDir = this_scriptDirectory + `/mymonero_core_js/monero_utils/` // this works for the MyMonero browser build, and is quite general, at least
			}
			fullPath = pathTo_cryptonoteUtilsDir + filename
		}
		if (fullPath == null) {
			throw "Unable to derive fullPath. Please pass locateFile() to bridge obj init."
		}
		//
		return fullPath
	}
	return new Promise(function(resolve, reject) {
		var Module_template = {}
    console.log("Using wasm: ", true)
    //
    Module_template["locateFile"] = locateFile
    require(`./MyMoneroCoreCpp_WASM`)(Module_template).then(function(thisModule)
    {
      const instance = new MyMoneroCoreBridgeClass(thisModule);
      resolve(instance);
    }).catch(function(e) {
      console.error("Error loading WASM_MyMoneroCoreCpp:", e);
      reject(e);
    });
	});
};
