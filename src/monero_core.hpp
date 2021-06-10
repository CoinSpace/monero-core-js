#ifndef monero_core_hpp
#define monero_core_hpp

#include <string>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <boost/foreach.hpp>

#include "string_tools.h"
#include "crypto.h"
#include "cryptonote_basic.h"
#include "cryptonote_format_utils.h"
#include "cryptonote_tx_utils.h"
#include "ringct/rctSigs.h"

namespace monero_core {
  struct SpendableOutput {
    uint64_t amount;
    std::string public_key;
    std::string out_pk;
    uint64_t global_index;
    uint64_t index;
    std::string tx_pub_key;
    uint64_t rct_type;
  };
  struct RandomAmountOutput {
    uint64_t global_index;
    std::string public_key;
    std::string out_pk;
  };
  struct RandomAmountOutputs {
    uint64_t amount;
    std::vector<RandomAmountOutput> outputs;
  };

  std::string createTx(const std::string &args_string);
}

#endif /* monero_core_hpp */
