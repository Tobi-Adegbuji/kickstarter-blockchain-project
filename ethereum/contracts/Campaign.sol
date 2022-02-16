// SPDX-License-Identifier: UNLISCENSED

pragma solidity ^0.8.9; 


contract CampaignFactory{

    address[] public deployedCampaigns;


    function createCampaign(uint minimumContribution) public {
        //When creating new contract from another contract, make sure to grab the 
        //the senders address and send it to the new contract or else the contract will pay the gas fees
        //Because our contract is the one creating a new contract. 
        Campaign newCampaign = new Campaign(minimumContribution, msg.sender); 
        deployedCampaigns.push(address(newCampaign)); 
    }

    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns; 
    }



 
}


contract Campaign{

    struct Request{
        string description; //Describes why the request is being created
        uint value; //amount of money the manager wants to send to vendor
        address payable recipient; //Address the money will be sent to (the vendor)
        bool complete; //True if the request has been processed (money sent)
        uint approvalCount; 
        mapping(address => bool) approvals;
    }

      modifier onlyManager(){
        require(msg.sender == manager); 
        _;
    }

    address public manager; 

    uint public minimumContribution; 

    uint public approversCount; 

    mapping(address => bool) public approvers;

    uint public numRequests;

    mapping(uint => Request) public requests;  

  

    constructor(uint _minimumContribution, address managerAddress){
        manager = managerAddress; 
        minimumContribution = _minimumContribution; 
    }

    function contribute() public payable {
        //msg.value is in wei. Remember that.
        require(msg.value > minimumContribution, "Must contribute more than min contribution."); 
        approvers[msg.sender] = true; 
        approversCount++; 
    }

    function createRequest(string memory _description, uint _value, address payable _recipient) 
            public onlyManager {
            Request storage newRequest = requests[numRequests++];
            newRequest.description = _description;
            newRequest.value = _value;
            newRequest.recipient = _recipient;
            newRequest.complete = false;
            newRequest.approvalCount = 0;
        }


    function approveRequest(uint key) public {

        Request storage req = requests[key];

        require(approvers[msg.sender], "You are not an approver.");
        require(!req.approvals[msg.sender], "You have already voted");

        req.approvals[msg.sender] = true; 
        req.approvalCount++;

    }

    function finalizeRequest(uint key) public onlyManager{
        Request storage req = requests[key];
        require(!req.complete, "This request was already completed");
        require(req.approvalCount > (approversCount / 2), "Not enough approvals to finalize request.");

        req.recipient.transfer(req.value); 
        req.complete = true;
    }
    

    function getSummary() public view returns (
        uint,uint,uint,uint,address
    ) {
        return(
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        ); 
    }

}