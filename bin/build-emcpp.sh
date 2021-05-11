#!/bin/sh

#EMCC_DEBUG=1 

mkdir -p build && 
cd build && 
emmake cmake .. && 
emmake cmake --build . && 
emmake make .