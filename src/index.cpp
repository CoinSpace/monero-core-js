//
//  index.cpp
//  Copyright (c) 2014-2019, MyMonero.com
//
//  All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without modification, are
//  permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
//  3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
//  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
//  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
//  THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
//  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
//  STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
//  THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//
#include <stdio.h>
#include <emscripten/bind.h>
#include <emscripten.h>
//
#include "serial_bridge_index.hpp"
#include "serial_bridge_utils.hpp"
#include "emscr_async_send_bridge.hpp"
//
using namespace std;
//
string send_funds(const string &args_string)
{
    try {
        emscr_async_bridge::send_funds(args_string);
        return string("{}");
    } catch (std::exception &e) {
        return serial_bridge_utils::error_ret_json_from_message(e.what());
    }
}
string send_cb_I__got_unspent_outs(const string &args_string)
{
    try {
        emscr_async_bridge::send_cb_I__got_unspent_outs(args_string);
        return string("{}");
    } catch (std::exception &e) {
        return serial_bridge_utils::error_ret_json_from_message(e.what());
    }
}
string send_cb_II__got_random_outs(const string &args_string)
{
    try {
        emscr_async_bridge::send_cb_II__got_random_outs(args_string);
        return string("{}");
    } catch (std::exception &e) {
        return serial_bridge_utils::error_ret_json_from_message(e.what());
    }
}
string send_cb_III__submitted_tx(const string &args_string)
{
    try {
        emscr_async_bridge::send_cb_III__submitted_tx(args_string);
        return string("{}");
    } catch (std::exception &e) {
        return serial_bridge_utils::error_ret_json_from_message(e.what());
    }
}
string send_step2__try_create_transaction(const string &args_string)
{
    try {
        return serial_bridge::send_step2__try_create_transaction(args_string);
    } catch (std::exception &e) {
        return serial_bridge_utils::error_ret_json_from_message(e.what());
    }
}
//
EMSCRIPTEN_BINDINGS(my_module)
{ // C++ -> JS
    emscripten::function("send_funds", &send_funds);
    emscripten::function("send_cb_I__got_unspent_outs", &send_cb_I__got_unspent_outs);
    emscripten::function("send_cb_II__got_random_outs", &send_cb_II__got_random_outs);
    emscripten::function("send_cb_III__submitted_tx", &send_cb_III__submitted_tx);
    emscripten::function("send_step2__try_create_transaction", &send_step2__try_create_transaction);
}
extern "C"
{ // C -> JS
}
int main() {
  // printf("hello, world!\n");
  return 0;
}
