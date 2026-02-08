#include <stdio.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "monero_core.hpp"

using namespace std;

emscripten::val createTx(const string& args_string) {
  monero_core::CreateTxResult result = monero_core::createTx(args_string);
  emscripten::val obj = emscripten::val::object();
  obj.set("rawTx", result.raw_tx);
  obj.set("txKey", result.tx_key);
  return obj;
}

string getExceptionMessage(intptr_t exceptionPtr) {
  return string(reinterpret_cast<exception *>(exceptionPtr)->what());
}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("createTx", &createTx);
  emscripten::function("getExceptionMessage", &getExceptionMessage);
}
