// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DDrive{

    //Access object
    struct Access{
        address user;
        bool permission;
    }

    mapping(address => string[]) files; //To upload files
    mapping(address => mapping(address => bool)) ownership; //To keep a tract of access grants
    mapping(address => Access[]) accessList; //Actual access list
    mapping(address => mapping(address => bool)) previousData; //To keep tract weather we previously grant access the user or not

    // To add files
    function addFile(address user, string memory url) public  {
        files[user].push(url);
    }

    // To allow access to other users
    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user]){
            for(uint i = 0; i < accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].permission = true;
                }
            }
        }else{
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    // To remove access fro user
    function disAllow(address user) public {
        ownership[msg.sender][user] = false;
        for(uint i = 0; i < accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].permission = false;
            }
        }
    }

    // To display the files
    function display(address user) external view returns (string[] memory) {
        require(user == msg.sender || ownership[user][msg.sender], "You don't have access");
        return files[user];
    }

    // To display the total access list
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

}