require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  // This is to change the default hardhat network number of accounts being generated
  networks: {
    hardhat: {
      accounts: {
        count: 1000,
      },
    },
  },
};
