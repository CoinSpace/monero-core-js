cmake_minimum_required(VERSION 3.4.1)

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

project(MoneroCoreJS)

if($ENV{BUILD} MATCHES "production")
  SET(CMAKE_BUILD_TYPE "Release")
  set(OPTIMIZATION "-Oz")
else()
  SET(CMAKE_BUILD_TYPE "Debug")
  set(OPTIMIZATION "-O0")
  set(DEBUG_DWARF "-g -gseparate-dwarf=MoneroCoreJS.debug.wasm")
endif()

set(MONERO_CORE_CPP_SRC "src/submodules/mymonero-core-cpp/src")
set(MONERO_SRC "src/submodules/mymonero-core-cpp/contrib/monero-core-custom")
set(BOOST_DIR ${CMAKE_SOURCE_DIR}/build/boost)

set(
  SRC_FILES
  src/index.cpp
  src/emscr_async_send_bridge.hpp
  src/emscr_async_send_bridge.cpp
  ${MONERO_CORE_CPP_SRC}/monero_address_utils.hpp
  ${MONERO_CORE_CPP_SRC}/monero_address_utils.cpp
  ${MONERO_CORE_CPP_SRC}/monero_paymentID_utils.hpp
  ${MONERO_CORE_CPP_SRC}/monero_paymentID_utils.cpp
  ${MONERO_CORE_CPP_SRC}/monero_key_image_utils.hpp
  ${MONERO_CORE_CPP_SRC}/monero_key_image_utils.cpp
  ${MONERO_CORE_CPP_SRC}/monero_fee_utils.hpp
  ${MONERO_CORE_CPP_SRC}/monero_fee_utils.cpp
  ${MONERO_CORE_CPP_SRC}/monero_transfer_utils.hpp
  ${MONERO_CORE_CPP_SRC}/monero_transfer_utils.cpp
  ${MONERO_CORE_CPP_SRC}/monero_fork_rules.hpp
  ${MONERO_CORE_CPP_SRC}/monero_fork_rules.cpp
  ${MONERO_CORE_CPP_SRC}/monero_wallet_utils.hpp
  ${MONERO_CORE_CPP_SRC}/monero_wallet_utils.cpp
  ${MONERO_CORE_CPP_SRC}/serial_bridge_index.hpp
  ${MONERO_CORE_CPP_SRC}/serial_bridge_index.cpp
  ${MONERO_CORE_CPP_SRC}/monero_send_routine.hpp
  ${MONERO_CORE_CPP_SRC}/monero_send_routine.cpp
  ${MONERO_CORE_CPP_SRC}/serial_bridge_utils.hpp
  ${MONERO_CORE_CPP_SRC}/serial_bridge_utils.cpp
  ${MONERO_CORE_CPP_SRC}/tools__ret_vals.hpp
  ${MONERO_CORE_CPP_SRC}/tools__ret_vals.cpp
  ${MONERO_SRC}/cryptonote_basic/cryptonote_basic_impl.cpp
  ${MONERO_SRC}/cryptonote_basic/account.cpp
  ${MONERO_SRC}/cryptonote_basic/cryptonote_format_utils.cpp
  ${MONERO_SRC}/crypto/crypto.cpp
  ${MONERO_SRC}/crypto/hash.c
  ${MONERO_SRC}/crypto/slow-hash-dummied.cpp
  ${MONERO_SRC}/crypto/oaes_lib.c
  ${MONERO_SRC}/crypto/crypto-ops.c
  ${MONERO_SRC}/crypto/crypto-ops-data.c
  ${MONERO_SRC}/crypto/keccak.c
  ${MONERO_SRC}/crypto/chacha.c
  ${MONERO_SRC}/crypto/random.c
  ${MONERO_SRC}/crypto/aesb.c
  ${MONERO_SRC}/crypto/tree-hash.c
  ${MONERO_SRC}/crypto/hash-extra-blake.c
  ${MONERO_SRC}/crypto/blake256.c
  ${MONERO_SRC}/crypto/hash-extra-groestl.c
  ${MONERO_SRC}/crypto/hash-extra-jh.c
  ${MONERO_SRC}/crypto/hash-extra-skein.c
  ${MONERO_SRC}/crypto/groestl.c
  ${MONERO_SRC}/crypto/jh.c
  ${MONERO_SRC}/crypto/skein.c
  ${MONERO_SRC}/cryptonote_core/cryptonote_tx_utils.cpp
  ${MONERO_SRC}/common/base58.cpp
  ${MONERO_SRC}/common/threadpool.cpp
  ${MONERO_SRC}/common/aligned.c
  ${MONERO_SRC}/common/util.cpp
  ${MONERO_SRC}/epee/src/hex.cpp
  ${MONERO_SRC}/epee/src/string_tools.cpp
  ${MONERO_SRC}/epee/src/memwipe.c
  ${MONERO_SRC}/epee/src/mlocker.cpp
  ${MONERO_SRC}/epee/src/wipeable_string.cpp
  ${MONERO_SRC}/device/device.cpp
  ${MONERO_SRC}/device/device_default.cpp
  ${MONERO_SRC}/ringct/rctOps.cpp
  ${MONERO_SRC}/ringct/rctTypes.cpp
  ${MONERO_SRC}/ringct/rctCryptoOps.c
  ${MONERO_SRC}/ringct/rctSigs.cpp
  ${MONERO_SRC}/ringct/bulletproofs.cc
  ${MONERO_SRC}/ringct/multiexp.cc
  ${MONERO_SRC}/mnemonics/electrum-words.cpp
  ${MONERO_SRC}/vtlogger/logger.cpp
  ${MONERO_SRC}/contrib/libsodium/src/crypto_verify/verify.c
)

set(
  EMCC_LINKER_FLAGS
  "-Wall -std=c++11 \
  --bind \
  -s MODULARIZE=1 \
  -s EXPORT_NAME=MoneroCoreJS \
  -s ASSERTIONS=2 \
  -s PRECISE_F32=1 \
  -s DISABLE_EXCEPTION_CATCHING=0 \
  -s EXCEPTION_DEBUG=1 \
  -s DEMANGLE_SUPPORT=1 \
  -s NO_DYNAMIC_EXECUTION=1 \
  -s NODEJS_CATCH_EXIT=0 \
  -s EXPORTED_RUNTIME_METHODS='[\"UTF8ToString\"]' \
  -s WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  ${OPTIMIZATION} ${DEBUG_DWARF} \
  "
)

message(STATUS "CMAKE_BUILD_TYPE: ${CMAKE_BUILD_TYPE}")
message(STATUS "EMCC_LINKER_FLAGS: ${EMCC_LINKER_FLAGS}")

add_executable(MoneroCoreJS ${SRC_FILES})

include_directories(MoneroCoreJS
  "build/boost/include"
  "src"
  ${MONERO_CORE_CPP_SRC}
  ${MONERO_SRC}
  "${MONERO_SRC}/epee/include"
  "${MONERO_SRC}/common"
  "${MONERO_SRC}/vtlogger"
  "${MONERO_SRC}/crypto"
  "${MONERO_SRC}/cryptonote_basic"
  "${MONERO_SRC}/multisig"
  "${MONERO_SRC}/cryptonote_core"
  "${MONERO_SRC}/cryptonote_protocol"
  "${MONERO_SRC}/wallet"
  "${MONERO_SRC}/rpc"
  "${MONERO_SRC}/mnemonics"
  "${MONERO_SRC}/contrib/libsodium/include"
  "${MONERO_SRC}/contrib/libsodium/include/sodium"
)

set_target_properties(MoneroCoreJS PROPERTIES LINK_FLAGS "${EMCC_LINKER_FLAGS}")
set_target_properties(MoneroCoreJS PROPERTIES SUFFIX ".js")

add_library(boost_chrono STATIC IMPORTED)
set_target_properties(boost_chrono PROPERTIES IMPORTED_LOCATION ${BOOST_DIR}/lib/libboost_chrono.a)
add_library(boost_system STATIC IMPORTED)
set_target_properties(boost_system PROPERTIES IMPORTED_LOCATION ${BOOST_DIR}/lib/libboost_system.a)
add_library(boost_thread STATIC IMPORTED)
set_target_properties(boost_thread PROPERTIES IMPORTED_LOCATION ${BOOST_DIR}/lib/libboost_thread.a)

target_link_libraries(
  MoneroCoreJS
  boost_chrono
  boost_system
  boost_thread
  ${log-lib}
)
