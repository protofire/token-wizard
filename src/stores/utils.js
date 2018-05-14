import { toFixed } from '../utils/utils'
import { contractStore, tokenStore, tierStore, web3Store } from './index'
import { BigNumber } from 'bignumber.js'

export function getWhiteListWithCapCrowdsaleAssets(networkID) {
  return new Promise((resolve) => {
    getCrowdsaleAsset("REACT_APP_REGISTRY_STORAGE", "registryStorage", networkID)
    getCrowdsaleAsset("REACT_APP_INIT_REGISTRY", "initRegistry", networkID)
    getCrowdsaleAsset("REACT_APP_SCRIPT_EXEC", "scriptExec", networkID)
    getCrowdsaleAsset("REACT_APP_APP_CONSOLE", "appConsole", networkID)
    getCrowdsaleAsset("REACT_APP_VERSION_CONSOLE", "versionConsole", networkID)
    getCrowdsaleAsset("REACT_APP_IMPLEMENTATION_CONSOLE", "implementationConsole", networkID)
    getCrowdsaleAsset("REACT_APP_MINTED_CAPPED_CROWDSALE_INIT_CROWDSALE", "initCrowdsaleMintedCapped", networkID)
    getCrowdsaleAsset("REACT_APP_MINTED_CAPPED_CROWDSALE_TOKEN_CONSOLE", "tokenConsoleMintedCapped", networkID)
    getCrowdsaleAsset("REACT_APP_MINTED_CAPPED_CROWDSALE_CROWDSALE_CONSOLE", "crowdsaleConsoleMintedCapped", networkID)
    getCrowdsaleAsset("REACT_APP_MINTED_CAPPED_CROWDSALE_CROWDSALE_BUY_TOKENS", "crowdsaleBuyTokensMintedCapped", networkID)
    getCrowdsaleAsset("REACT_APP_DUTCH_CROWDSALE_INIT_CROWDSALE", "initCrowdsaleDutchAuction", networkID)
    getCrowdsaleAsset("REACT_APP_DUTCH_CROWDSALE_TOKEN_CONSOLE", "tokenConsoleDutchAuction", networkID)
    getCrowdsaleAsset("REACT_APP_DUTCH_CROWDSALE_CROWDSALE_CONSOLE", "crowdsaleConsoleDutchAuction", networkID)
    getCrowdsaleAsset("REACT_APP_DUTCH_CROWDSALE_CROWDSALE_BUY_TOKENS", "crowdsaleBuyTokensDutchAuction", networkID)
    resolve(contractStore)
  })
}

function getCrowdsaleAsset(contractName, stateProp, networkID) {
  console.log(contractName, stateProp, networkID)
  const bin = process.env[`${contractName}_BIN`] || ''
  let abi;
  //to do
  switch (stateProp) {
    case "registryStorage":
      abi = [{"constant":false,"inputs":[{"name":"_updater","type":"address"},{"name":"_is_payable","type":"bool"},{"name":"_init","type":"address"},{"name":"_init_calldata","type":"bytes"},{"name":"_allowed","type":"address[]"}],"name":"initAndFinalize","outputs":[{"name":"exec_id","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"},{"name":"_new_init","type":"address"}],"name":"changeInitAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"},{"name":"_new_script_exec","type":"address"}],"name":"changeScriptExec","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_registry_exec_id","type":"bytes32"},{"name":"_app_provider","type":"bytes32"},{"name":"_app_name","type":"bytes32"}],"name":"getAppInitInfo","outputs":[{"name":"","type":"bool"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_updater","type":"address"},{"name":"_is_payable","type":"bool"},{"name":"_init","type":"address"},{"name":"_init_calldata","type":"bytes"},{"name":"_allowed","type":"address[]"}],"name":"initAppInstance","outputs":[{"name":"exec_id","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_exec_id","type":"bytes32"}],"name":"getExecAllowed","outputs":[{"name":"allowed","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_exec_id","type":"bytes32"},{"name":"_locations","type":"bytes32[]"}],"name":"readMulti","outputs":[{"name":"data_read","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_exec_id","type":"bytes32"},{"name":"_location","type":"bytes32"}],"name":"read","outputs":[{"name":"data_read","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"app_info","outputs":[{"name":"is_paused","type":"bool"},{"name":"is_active","type":"bool"},{"name":"is_payable","type":"bool"},{"name":"updater","type":"address"},{"name":"script_exec","type":"address"},{"name":"init","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"name":"allowed_addr_list","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"},{"name":"_to_remove","type":"address[]"}],"name":"removeAllowed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"}],"name":"finalizeAppInstance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GET_APP_INIT_INFO","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"}],"name":"pauseAppInstance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_calldata","type":"bytes"}],"name":"exec","outputs":[{"name":"success","type":"bool"},{"name":"amount_written","type":"uint256"},{"name":"ret_data","type":"bytes"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"}],"name":"allowed_addresses","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"},{"name":"_to_add","type":"address[]"}],"name":"addAllowed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"}],"name":"unpauseAppInstance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"execution_id","type":"bytes32"},{"indexed":true,"name":"init_address","type":"address"},{"indexed":false,"name":"script_exec","type":"address"},{"indexed":false,"name":"updater","type":"address"}],"name":"ApplicationInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"execution_id","type":"bytes32"},{"indexed":true,"name":"init_address","type":"address"}],"name":"ApplicationFinalization","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"execution_id","type":"bytes32"},{"indexed":true,"name":"script_target","type":"address"}],"name":"ApplicationExecution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"execution_id","type":"bytes32"},{"indexed":true,"name":"destination","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"DeliveredPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"application_address","type":"address"},{"indexed":true,"name":"execution_id","type":"bytes32"},{"indexed":true,"name":"message","type":"bytes32"}],"name":"ApplicationException","type":"event"}];
      break;
    case "scriptExec":
      abi = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"deployed_apps","outputs":[{"name":"deployer","type":"address"},{"name":"app_name","type":"bytes32"},{"name":"version_name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"APP_EXEC","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"deployer_instances","outputs":[{"name":"exec_id","type":"bytes32"},{"name":"app_name","type":"bytes32"},{"name":"version_name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"new_script_exec","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_app","type":"bytes32"},{"name":"_is_payable","type":"bool"},{"name":"_init_calldata","type":"bytes"}],"name":"initAppInstance","outputs":[{"name":"app_storage","type":"address"},{"name":"ver_name","type":"bytes32"},{"name":"app_exec_id","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_exec_id","type":"bytes32"}],"name":"getAppAllowed","outputs":[{"name":"allowed","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_new_updater","type":"address"}],"name":"changeUpdater","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INIT_APP","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"exec_id_lists","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"default_provider","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_new_id","type":"bytes32"}],"name":"changeRegistryExecId","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_calldata","type":"bytes"}],"name":"initRegistryWithCalldata","outputs":[{"name":"exec_id","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"default_updater","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_exec_id","type":"bytes32"}],"name":"migrateApplication","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_new_exec","type":"address"}],"name":"changeExec","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_new_admin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_new_provider","type":"bytes32"}],"name":"changeProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GET_INIT_INFO","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"exec_admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_app_calldata","type":"bytes"}],"name":"exec","outputs":[{"name":"failed","type":"bool"},{"name":"returned_data","type":"bytes"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_new_storage","type":"address"}],"name":"changeStorage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"default_registry_exec_id","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"default_storage","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GET_ALLOWED","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_update_source","type":"address"},{"name":"_registry_storage","type":"address"},{"name":"_app_provider_id","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storage_addr","type":"address"},{"indexed":true,"name":"exec_id","type":"bytes32"},{"indexed":false,"name":"new_exec_addr","type":"address"},{"indexed":false,"name":"original_deployer","type":"address"}],"name":"ApplicationMigration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storage_addr","type":"address"},{"indexed":true,"name":"exec_id","type":"bytes32"},{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"wei_sent","type":"uint256"}],"name":"StorageException","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"creator","type":"address"},{"indexed":true,"name":"exec_id","type":"bytes32"},{"indexed":false,"name":"storage_addr","type":"address"},{"indexed":false,"name":"app_name","type":"bytes32"},{"indexed":false,"name":"version_name","type":"bytes32"}],"name":"AppInstanceCreated","type":"event"}];
      break;
    case "initCrowdsaleMintedCapped":
      abi = [{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"allowed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getTokensSold","outputs":[{"name":"tokens_sold","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_tier_index","type":"uint256"}],"name":"getTierWhitelist","outputs":[{"name":"num_whitelisted","type":"uint256"},{"name":"whitelist","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_tier_index","type":"uint256"},{"name":"_buyer","type":"address"}],"name":"getWhitelistStatus","outputs":[{"name":"minimum_contribution","type":"uint256"},{"name":"max_spend_remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_index","type":"uint256"}],"name":"getTierStartAndEndDates","outputs":[{"name":"tier_start","type":"uint256"},{"name":"tier_end","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"decimals","outputs":[{"name":"token_decimals","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_index","type":"uint256"}],"name":"getCrowdsaleTier","outputs":[{"name":"tier_name","type":"bytes32"},{"name":"tier_sell_cap","type":"uint256"},{"name":"tier_price","type":"uint256"},{"name":"tier_duration","type":"uint256"},{"name":"duration_is_modifiable","type":"bool"},{"name":"whitelist_enabled","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"totalSupply","outputs":[{"name":"total_supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleStartAndEndTimes","outputs":[{"name":"start_time","type":"uint256"},{"name":"end_time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"symbol","outputs":[{"name":"token_symbol","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"owner_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleMaxRaise","outputs":[{"name":"wei_raise_cap","type":"uint256"},{"name":"total_sell_cap","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_agent","type":"address"}],"name":"getTransferAgentStatus","outputs":[{"name":"is_transfer_agent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_destination","type":"address"}],"name":"getReservedDestinationInfo","outputs":[{"name":"destination_list_index","type":"uint256"},{"name":"num_tokens","type":"uint256"},{"name":"num_percent","type":"uint256"},{"name":"percent_decimals","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"isCrowdsaleFull","outputs":[{"name":"is_crowdsale_full","type":"bool"},{"name":"max_sellable","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleUniqueBuyers","outputs":[{"name":"num_unique","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getAdmin","outputs":[{"name":"admin","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getReservedTokenDestinationList","outputs":[{"name":"num_destinations","type":"uint256"},{"name":"reserved_destinations","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getTokenInfo","outputs":[{"name":"token_name","type":"bytes32"},{"name":"token_symbol","type":"bytes32"},{"name":"token_decimals","type":"uint256"},{"name":"total_supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleInfo","outputs":[{"name":"wei_raised","type":"uint256"},{"name":"team_wallet","type":"address"},{"name":"minimum_contribution","type":"uint256"},{"name":"is_initialized","type":"bool"},{"name":"is_finalized","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_team_wallet","type":"address"},{"name":"_start_time","type":"uint256"},{"name":"_initial_tier_name","type":"bytes32"},{"name":"_initial_tier_price","type":"uint256"},{"name":"_initial_tier_duration","type":"uint256"},{"name":"_initial_tier_token_sell_cap","type":"uint256"},{"name":"_initial_tier_is_whitelisted","type":"bool"},{"name":"_initial_tier_duration_is_modifiable","type":"bool"},{"name":"_admin","type":"address"}],"name":"init","outputs":[{"name":"store_data","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"name","outputs":[{"name":"token_name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCurrentTierInfo","outputs":[{"name":"tier_name","type":"bytes32"},{"name":"tier_index","type":"uint256"},{"name":"tier_ends_at","type":"uint256"},{"name":"tier_tokens_remaining","type":"uint256"},{"name":"tier_price","type":"uint256"},{"name":"duration_is_modifiable","type":"bool"},{"name":"whitelist_enabled","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleTierList","outputs":[{"name":"crowdsale_tiers","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}];
      break;
    case "initCrowdsaleDutchAuction":
      abi = [{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"allowed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getTokensSold","outputs":[{"name":"tokens_sold","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_buyer","type":"address"}],"name":"getWhitelistStatus","outputs":[{"name":"minimum_contribution","type":"uint256"},{"name":"max_spend_remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"decimals","outputs":[{"name":"token_decimals","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"totalSupply","outputs":[{"name":"total_supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleStartAndEndTimes","outputs":[{"name":"start_time","type":"uint256"},{"name":"end_time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"symbol","outputs":[{"name":"token_symbol","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"owner_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"},{"name":"_agent","type":"address"}],"name":"getTransferAgentStatus","outputs":[{"name":"is_transfer_agent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"isCrowdsaleFull","outputs":[{"name":"is_crowdsale_full","type":"bool"},{"name":"max_sellable","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleUniqueBuyers","outputs":[{"name":"num_unique","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleStatus","outputs":[{"name":"start_rate","type":"uint256"},{"name":"end_rate","type":"uint256"},{"name":"current_rate","type":"uint256"},{"name":"sale_duration","type":"uint256"},{"name":"time_remaining","type":"uint256"},{"name":"tokens_remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_wallet","type":"address"},{"name":"_total_supply","type":"uint256"},{"name":"_max_amount_to_sell","type":"uint256"},{"name":"_starting_rate","type":"uint256"},{"name":"_ending_rate","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_start_time","type":"uint256"},{"name":"_sale_is_whitelisted","type":"bool"},{"name":"_admin","type":"address"}],"name":"init","outputs":[{"name":"store_data","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getAdmin","outputs":[{"name":"admin","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleWhitelist","outputs":[{"name":"num_whitelisted","type":"uint256"},{"name":"whitelist","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getTokenInfo","outputs":[{"name":"token_name","type":"bytes32"},{"name":"token_symbol","type":"bytes32"},{"name":"token_decimals","type":"uint256"},{"name":"total_supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"getCrowdsaleInfo","outputs":[{"name":"wei_raised","type":"uint256"},{"name":"team_wallet","type":"address"},{"name":"minimum_contribution","type":"uint256"},{"name":"is_initialized","type":"bool"},{"name":"is_finalized","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_storage","type":"address"},{"name":"_exec_id","type":"bytes32"}],"name":"name","outputs":[{"name":"token_name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];
      break;
    default:
      abi = []
      break;
  }
  //const abi = JSON.parse(process.env[`${contractName}_ABI`] || '[]')
  const addr = JSON.parse(process.env[`${contractName}_ADDRESS`] || {})[networkID]

  return Promise.all([bin, abi, addr])
    .then(result => addContractsToState(...result, stateProp))
}

function addContractsToState(bin, abi, addr, contract) {
  contractStore.setContract(contract, {
    bin,
    abi: abi,
    addr: addr,
    abiConstructor: []
  });
}

export const getconstructorParams = (abiConstructor, vals, crowdsaleNum, isCrowdsale) => {
  let params = {"types": [], "vals": []};
  if (!abiConstructor) return params;

  for (let j = 0; j < abiConstructor.length; j++) {
    let inp = abiConstructor[j];
    params.types.push(inp.type);
    if (vals.length > 0) {
      params.vals.push(vals[j]);
    } else {
      switch(inp.name) {
        case "_start":
          params.vals.push(toFixed(new Date(tierStore.tiers[crowdsaleNum].startTime).getTime() / 1000).toString());
          break;
        case "_end":
          params.vals.push(toFixed(new Date(tierStore.tiers[crowdsaleNum].endTime).getTime() / 1000).toString());
          break;
        case "_rate":
          params.vals.push(tierStore.tiers[crowdsaleNum].rate);
          break;
        case "_multisigWallet":
          params.vals.push(tierStore.tiers[0].walletAddress);
          break;
        case "_token":
          params.vals.push(contractStore.token.addr);
          break;
        case "_crowdsale":
          params.vals.push(contractStore.crowdsale.addr[crowdsaleNum]);
          break;
        case "_name":
          if (isCrowdsale) {
            params.vals.push(tierStore.tiers[crowdsaleNum].tier);
          } else {
            params.vals.push(tokenStore.name);
          }
          break;
        case "_symbol":
          params.vals.push(tokenStore.ticker);
          break;
        case "_decimals":
          params.vals.push(tokenStore.decimals);
          break;
        case "_globalMinCap":
          params.vals.push(tierStore.tiers[0].whitelistEnabled !== 'yes' ? tokenStore.globalmincap ? toFixed(tokenStore.globalmincap * 10 ** tokenStore.decimals).toString() : 0 : 0)
          break;
        case "_initialSupply":
          params.vals.push(tokenStore.supply);
          break;
        case "_maximumSellableTokens":
          params.vals.push(toFixed(tierStore.tiers[crowdsaleNum].supply * 10**tokenStore.decimals).toString());
          break;
        case "_minimumFundingGoal":
          params.vals.push(0);
          break;
        case "_mintable":
          params.vals.push(true);
          break;
        case "_oneTokenInWei":
          BigNumber.config({ DECIMAL_PLACES: 18 })
          const rate = new BigNumber(tierStore.tiers[crowdsaleNum].rate)
          const tokenInEther = rate.pow(-1).toFixed()
          params.vals.push(web3Store.web3.utils.toWei(tokenInEther, "ether"))
          break;
        case "_isUpdatable":
          params.vals.push(tierStore.tiers[crowdsaleNum].updatable ? tierStore.tiers[crowdsaleNum].updatable==="on" ? true : false : false);
          break;
        case "_isWhiteListed":
          params.vals.push(tierStore.tiers[0].whitelistEnabled ? tierStore.tiers[0].whitelistEnabled === "yes" : false)
          break;
        default:
          params.vals.push("");
          break;
      }
    }
  }
  return params;
}
