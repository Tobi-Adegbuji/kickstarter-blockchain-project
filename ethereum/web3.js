import Web3 from "web3";
 
let web3;
 
//typeof gets the type of the value 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/1c9c0aa9a694433aa907a8b60d97a7b6"
  );
  web3 = new Web3(provider);
}
 
export default web3;