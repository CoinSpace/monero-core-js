#include "monero_core.hpp"

using namespace std;
using namespace monero_core;

void parse_addresses(
  boost::property_tree::ptree& json_root,
  const cryptonote::network_type& nettype,
  cryptonote::account_keys& account_keys,
  unordered_map<crypto::public_key, cryptonote::subaddress_index>& subaddresses
) {
  size_t i = 0;
  BOOST_FOREACH(boost::property_tree::ptree::value_type& from_address, json_root.get_child("addresses"))
	{
		assert(from_address.first.empty());
    auto address = from_address.second.get_value<string>();
    cryptonote::address_parse_info info;
    if (!cryptonote::get_account_address_from_str(info, nettype, address)) throw std::runtime_error("Invalid from_address");
    if (i == 0) {
      account_keys.m_account_address = info.address;
    }
    subaddresses[info.address.m_spend_public_key] = {0,i};
    i++;
	}
}

void parse_destinations(
  boost::property_tree::ptree& json_root,
  vector<uint8_t>& extra,
  const cryptonote::network_type& nettype,
  vector<cryptonote::tx_destination_entry>& splitted_dsts
) {
  size_t i = 0;
  boost::property_tree::ptree destinations = json_root.get_child("destinations");
  size_t size = destinations.size();
	BOOST_FOREACH(boost::property_tree::ptree::value_type& item, destinations)
	{
		assert(item.first.empty());
    cryptonote::tx_destination_entry destination = cryptonote::tx_destination_entry{};
    cryptonote::address_parse_info destination_info;
	  cryptonote::get_account_address_from_str(destination_info, nettype, item.second.get<string>("address"));
    destination.addr = destination_info.address;
    destination.amount = stoull(item.second.get<string>("amount"));
    destination.is_subaddress = destination_info.is_subaddress;
    splitted_dsts.push_back(destination);
    if (i == 0 && destination_info.has_payment_id) { // destination
      string extra_nonce;
      crypto::hash8 payment_id = destination_info.payment_id;
      cryptonote::set_encrypted_payment_id_to_tx_extra_nonce(extra_nonce, payment_id);
      cryptonote::add_extra_nonce_to_tx_extra(extra, extra_nonce);
    }
    i++;
	}
}

void parse_inputs(boost::property_tree::ptree& json_root, vector<SpendableOutput>& outputs) {
	BOOST_FOREACH(boost::property_tree::ptree::value_type& output_desc, json_root.get_child("sources"))
	{
		assert(output_desc.first.empty());
		SpendableOutput out{};
		out.amount = stoull(output_desc.second.get<string>("amount"));
		out.public_key = output_desc.second.get<string>("targetKey");
		out.out_pk = output_desc.second.get<string>("outPk");
		out.global_index = stoull(output_desc.second.get<string>("globalIndex"));
		out.index = stoull(output_desc.second.get<string>("index"));
		out.tx_pub_key = output_desc.second.get<string>("txPubKey");
		out.rct_type = stoull(output_desc.second.get<string>("rctType"));
		outputs.push_back(std::move(out));
	}
}

void parse_mixins(boost::property_tree::ptree& json_root, vector<RandomAmountOutputs>& mixins) {
	BOOST_FOREACH(boost::property_tree::ptree::value_type& mix_out_desc, json_root.get_child("mixins"))
	{
		assert(mix_out_desc.first.empty());
		auto amountAndOuts = RandomAmountOutputs{};
		amountAndOuts.amount = stoull(mix_out_desc.second.get<string>("amount"));
		BOOST_FOREACH(boost::property_tree::ptree::value_type& mix_out_output_desc, mix_out_desc.second.get_child("outputs"))
		{
			assert(mix_out_output_desc.first.empty());
			auto amountOutput = RandomAmountOutput{};
			amountOutput.global_index = stoull(mix_out_output_desc.second.get<string>("globalIndex"));
			amountOutput.public_key = mix_out_output_desc.second.get<string>("targetKey");
			amountOutput.out_pk = mix_out_output_desc.second.get<string>("outPk");
			amountAndOuts.outputs.push_back(std::move(amountOutput));
		}
		mixins.push_back(std::move(amountAndOuts));
	}
}

void make_sources(
  boost::property_tree::ptree& json_root,
  vector<SpendableOutput>& outputs,
  vector<RandomAmountOutputs>& mixins,
  const cryptonote::account_keys& account_keys,
  vector<cryptonote::tx_source_entry>& sources
) {
  const uint32_t fake_outputs_count = 10;
  for (size_t out_index = 0; out_index < outputs.size(); out_index++) {
		auto src = cryptonote::tx_source_entry{};
		src.amount = outputs[out_index].amount;
		src.rct = true;
    // sort fake outputs by global index
    std::sort(mixins[out_index].outputs.begin(), mixins[out_index].outputs.end(), [] (
      RandomAmountOutput const& a,
      RandomAmountOutput const& b
    ) {
      return a.global_index < b.global_index;
    });
    // add mixins
    for (size_t j = 0; src.outputs.size() < fake_outputs_count && j < mixins[out_index].outputs.size(); j++) {
      auto item = mixins[out_index].outputs[j];
      if (item.global_index == outputs[out_index].global_index) {
        continue;
      }
      auto oe = cryptonote::tx_source_entry::output_entry{};
      oe.first = item.global_index;
      crypto::public_key public_key = crypto::public_key{};
      epee::string_tools::hex_to_pod(item.public_key, public_key);
      oe.second.dest = rct::pk2rct(public_key);
      rct::key commit;
      epee::string_tools::hex_to_pod(item.out_pk, commit);
      oe.second.mask = commit;
      src.outputs.push_back(oe);
    }
    // add real entry
		auto real_oe = cryptonote::tx_source_entry::output_entry{};
		real_oe.first = outputs[out_index].global_index;
		crypto::public_key public_key = crypto::public_key{};
    epee::string_tools::hex_to_pod(outputs[out_index].public_key, public_key);
    real_oe.second.dest = rct::pk2rct(public_key);
    rct::key commit;
    epee::string_tools::hex_to_pod(outputs[out_index].out_pk, commit);
    real_oe.second.mask = commit;
		uint64_t real_output_index = src.outputs.size();
		for (size_t j = 0; j < src.outputs.size(); j++) {
			if (real_oe.first < src.outputs[j].first) {
				real_output_index = j;
				break;
			}
		}
		src.outputs.insert(src.outputs.begin() + real_output_index, real_oe);

    crypto::public_key tx_pub_key = crypto::public_key{};
		epee::string_tools::hex_to_pod(outputs[out_index].tx_pub_key, tx_pub_key);
		src.real_out_tx_key = tx_pub_key;
		src.real_out_additional_tx_keys = {};
		src.real_output = real_output_index;
		uint64_t internal_output_index = outputs[out_index].index;
		src.real_output_in_tx_index = internal_output_index;

    if (outputs[out_index].rct_type == rct::RCTTypeNull) {
      src.mask = rct::identity();
    } else {
      crypto::key_derivation derivation;
      crypto::generate_key_derivation(tx_pub_key, account_keys.m_view_secret_key, derivation);
      crypto::secret_key scalar;
      crypto::derivation_to_scalar(derivation, internal_output_index, scalar);
      src.mask = rct::genCommitmentMask(rct::sk2rct(scalar));
    }
		src.multisig_kLRki = rct::multisig_kLRki({rct::zero(), rct::zero(), rct::zero(), rct::zero()});
		sources.push_back(src);
	}
}

rct::RCTConfig get_rct_config() {
  rct::RangeProofType range_proof_type = rct::RangeProofPaddedBulletproof;
  int bp_version = 3;
  const rct::RCTConfig rct_config {
		range_proof_type,
		bp_version,
	};
  return rct_config;
}

string monero_core::createTx(const string &args_string) {

  boost::property_tree::ptree json_root;
  istringstream ss(args_string);
  boost::property_tree::read_json(ss, json_root);

	string sec_viewKey_string = json_root.get<string>("secretViewKey");
	string sec_spendKey_string = json_root.get<string>("secretSpendKey");

  const cryptonote::network_type nettype = cryptonote::network_type::MAINNET;
  cryptonote::account_keys account_keys;

  crypto::secret_key sec_viewKey;
  if (!epee::string_tools::hex_to_pod(sec_viewKey_string, sec_viewKey)) throw std::runtime_error("Invalid secretViewKey");
  account_keys.m_view_secret_key = sec_viewKey;

  crypto::secret_key sec_spendKey;
  if (!epee::string_tools::hex_to_pod(sec_spendKey_string, sec_spendKey)) throw std::runtime_error("Invalid secretSpendKey");
  account_keys.m_spend_secret_key = sec_spendKey;

  vector<uint8_t> extra;

	unordered_map<crypto::public_key, cryptonote::subaddress_index> subaddresses;
  parse_addresses(json_root, nettype, account_keys, subaddresses);

  vector<SpendableOutput> outputs;
  parse_inputs(json_root, outputs);

  vector<RandomAmountOutputs> mixins;
  parse_mixins(json_root, mixins);

  vector<cryptonote::tx_source_entry> sources;
  make_sources(json_root, outputs, mixins, account_keys, sources);

  vector<cryptonote::tx_destination_entry> splitted_dsts;
  parse_destinations(json_root, extra, nettype, splitted_dsts);

  const rct::RCTConfig rct_config = get_rct_config();
  uint64_t unlock_time = 0;
	cryptonote::transaction tx;
	crypto::secret_key tx_key;
	vector<crypto::secret_key> additional_tx_keys;

  cryptonote::tx_destination_entry change_dst = cryptonote::tx_destination_entry{}; // null

  bool r = cryptonote::construct_tx_and_get_tx_key(
		account_keys, subaddresses,
		sources, splitted_dsts, change_dst.addr, extra,
		tx, unlock_time, tx_key, additional_tx_keys,
		true, rct_config,
		NULL
	);

  if (!r) throw std::runtime_error("Error from construct_tx_and_get_tx_key");
  // string tx_hash_string = epee::string_tools::pod_to_hex(cryptonote::get_transaction_hash(tx));
  // printf("tx_hash_string: %s\n", tx_hash_string.c_str());
	string signed_serialized_tx_string = epee::string_tools::buff_to_hex_nodelimer(cryptonote::tx_to_blob(tx));
  return signed_serialized_tx_string;
}
