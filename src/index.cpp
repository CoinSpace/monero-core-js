#include <stdio.h>
#include <emscripten/bind.h>
#include <emscripten.h>

using namespace std;

string hello(const string& args_string) {
  printf("args_string: %s\n", args_string.c_str());
  return args_string.c_str();
}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("hello", &hello);
}
