const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 5000000
    },
    inf_Katana_mainnet: {
      network_id: 1,
      gasPrice: 1,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\SpinHit\\Desktop\\Solideprojet\\gazu.env', 'utf-8'), "https://mainnet.infura.io/v3/43fd9ae212114952bb114054332f394f")
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
