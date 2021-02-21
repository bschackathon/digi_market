//const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "grunt squirrel judge notable inherit abstract car furnace trophy rely city dress";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/918324bac7924b7ea8bc1f32a9bf3098")
      },
      from: "0x5Bd46de6E8d4e8Ba0fdd76ACC8d543bA07b58dE5",
      network_id: "*",
      skipDryRun: true,
      timeoutBlocks: 200,
      confirmations: 2 
    },
    bsctestnet: {
      networkCheckTimeout: 10000,
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://data-seed-prebsc-2-s3.binance.org:8545")
      },
      from: "0x5Bd46de6E8d4e8Ba0fdd76ACC8d543bA07b58dE5",
      network_id: 97,
      confirmations: 1,
      timeoutBlocks: 100000,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "^0.6.0"     // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
