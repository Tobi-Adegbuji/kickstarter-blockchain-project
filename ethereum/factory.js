//Getting instance we created
import web3 from "./web3";
//We need to give web 3 the contract abi to interact with the smart contract
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x1715B9E91f81D5E1acc9Be5C1637f3F41674aC06"
);

//To get access of smart contract we can just import this file
export default instance; 
