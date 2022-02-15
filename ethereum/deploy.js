const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  //Usually would place in ENV file but doesnt matter since this is a test account with no real money
  "chest elbow soap scorpion alarm riot gentle cage relax carpet light jealous",
  "https://rinkeby.infura.io/v3/1c9c0aa9a694433aa907a8b60d97a7b6"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "3000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();

//Current Campaign Contract is deployed at: 0xbbc3d1b671D16fd306b9556Ed8529190c0753030
