#!/bin/sh

set -e

mkdir -p build &&
cd build &&
emmake cmake .. &&
emmake cmake --build . &&
emmake make .

cp MyMoneroCoreCpp_WASM ../monero_utils/MyMoneroCoreCpp_WASM.js
cp MyMoneroCoreCpp_WASM.wasm ../monero_utils/MyMoneroCoreCpp_WASM.wasm
