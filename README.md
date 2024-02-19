# Monero Core JS

[![Build](https://github.com/CoinSpace/monero-core-js/actions/workflows/ci.yml/badge.svg)](https://github.com/CoinSpace/monero-core-js/actions/workflows/ci.yml)
[![Version](https://img.shields.io/github/v/tag/CoinSpace/monero-core-js?label=version)](https://github.com/CoinSpace/monero-core-js/tags)
[![License](https://img.shields.io/github/license/CoinSpace/monero-core-js?color=blue)](https://github.com/CoinSpace/monero-core-js/blob/master/LICENSE)

JS library for creating Monero transactions.

## Development

```
docker-compose build
docker-compose up -d
docker exec -it monero-core-js-emscripten-1 cp -r /src/build /app
docker exec -it monero-core-js-emscripten-1 ./bin/build-emcpp.sh

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
