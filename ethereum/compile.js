/*
Steps that Occur in compilation
-------------------------------

1) Delete entire "build" folder
2) Read "Campaign.sol" from the contracts folder
3) Compile both contracts with solidity compiler
4) Wrtie output to the "build" directory
*/

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const sourceCode = fs.readFileSync(campaignPath, "utf8");

//Compile contract
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol']; 

fs.ensureDirSync(buildPath);

console.log(output); 

for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath, contract + ".json"),
        output[contract]
      );
}; 
