# Monero Core JS

## Development

```
docker-compose build
docker-compose up -d
docker exec -it monero-core-js_emscripten_1 cp -r /src/build /app
docker exec -it monero-core-js_emscripten_1 ./bin/build-emcpp.sh

npm install
npm test
```

## Debug in Chrome Console

Install https://goo.gle/wasm-debugging-extension and set Path substitutions in extension options:
```
Module: MyMoneroCoreCpp_WASM.wasm
/app
[path_to_monero_core_js]
```

Open Chrome DevTools, click the gear (⚙) icon in the top right corner of DevTools pane, go to the Experiments panel and tick WebAssembly Debugging: Enable DWARF support.

```
npm run serve
npm run serve:wasm
# Open Chrome Console => Sources => file:// => add break point
```
