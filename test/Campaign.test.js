const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");
const { beforeEach } = require("mocha");

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.abi))
    .deploy({
      data: compiledFactory.evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

    await factory.methods.createCampaign('100').send({
      from: accounts[0],
      gas: "1000000"
    });
    
    //This means we are taking the first element from the array and assigning it to the campaignAddress variable above. 
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); 

    //Notice we are not deploying anything here. 
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.abi),
        campaignAddress
    ); 
    

});
