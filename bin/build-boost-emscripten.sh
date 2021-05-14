#!/bin/sh

set -e

PLATFORM="emscripten"

SRC_DIR="contrib/boost-sdk"
INSTALL_DIR="build/boost"

SRC_PATH="$(pwd)/$SRC_DIR"
INSTALL_PATH="$(pwd)/$INSTALL_DIR"
JAM_CONFIG_PATH="$(pwd)/configs/$PLATFORM.jam"

if [ ! -d "$SRC_PATH" ]; then
  echo "SOURCE NOT FOUND!"
  exit 1
fi

if [ -z "$EMSCRIPTEN" ]; then
  echo "EMSCRIPTEN MUST BE DEFINED!"
  exit -1
fi

cd $EMSCRIPTEN; ./embuilder.py build zlib

# ---

cd "$SRC_PATH"

rm -rf bjam
rm -rf b2
rm -rf project-config.jam
rm -rf bootstrap.log
rm -rf bin.v2

export NO_BZIP2=1 #bc it's supplied by emscripten but b2 will fail to find it


#  --with-libraries=atomic,signals,timer,system,filesystem,thread,date_time,chrono,regex,serialization,program_options,locale \


./bootstrap.sh \
  --with-libraries=system,thread,chrono \
2>&1

if [ $? != 0 ]; then
  echo "ERROR: boostrap FAILED!"
  exit 1
fi

cat "$JAM_CONFIG_PATH" >> project-config.jam

# ---
# Clean
rm -rf "$INSTALL_PATH"
mkdir -p "$INSTALL_PATH"


HOST_NCORES=$(shell nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 1)


# threading=single \
./b2 -q -a -j$HOST_NCORES    \
  toolset=clang-emscripten   \
  link=static                \
  optimization=space         \
  variant=release            \
  stage                      \
  --stagedir="$INSTALL_PATH" \
  2>&1

unset NO_BZIP2

if [ $? != 0 ]; then
  echo "ERROR: b2 FAILED!"
  exit 1
fi

# ---

cd "$INSTALL_PATH"
ln -s "$SRC_PATH" include
