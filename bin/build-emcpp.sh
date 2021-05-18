#!/bin/sh

set -e

mkdir -p build &&
cd build &&
emmake cmake .. &&
emmake cmake --build . &&
emmake make .
