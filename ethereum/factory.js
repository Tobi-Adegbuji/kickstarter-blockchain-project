//Getting instance we created
import web3 from "./web3";
//We need to give web 3 the contract abi to interact with the smart contract
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xbbc3d1b671D16fd306b9556Ed8529190c0753030"
);

//To get access of smart contract we can just import this file
export default instance; 
