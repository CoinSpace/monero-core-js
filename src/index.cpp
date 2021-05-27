#include <stdio.h>
#include <emscripten/bind.h>
#include "monero_core.hpp"

using namespace std;

string createTx(const string& args_string) {
  string result = monero_core::createTx(args_string);
  return result.c_str();
}

string getExceptionMessage(intptr_t exceptionPtr) {
  return string(reinterpret_cast<exception *>(exceptionPtr)->what());
}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("createTx", &createTx);
  emscripten::function("getExceptionMessage", &getExceptionMessage);
}
