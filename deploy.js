const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider({
  mnemonic: 'game saddle oyster laundry equal loop lunch allow cactus endless hover unfair',
  // 'game saddle oyster laundry equal loop lunch allow cactus endless hover unfair',
  providerOrUrl: 'https://rinkeby.infura.io/v3/1d0ca15cd23f45d392029341b9c812b3'

});
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  console.log(interface);
  console.log('Contract deployed to', result.options.address);
};
deploy();
