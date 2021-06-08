// SPDX-License-Identifier: GNU 3
pragma solidity >=0.4.25 <=0.8.4;

contract Diploanch {
    address public owner;
    uint public last_completed_migration;
    string[] hashes;

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    // constructor() public {
    //   owner = msg.sender;
    // }

    function addHash(string memory fileHash) public returns (bool) {
        if(this.checkHash(fileHash)){
            return false;
        } else {
            hashes.push(fileHash);
            return true;
        }
    }

    function checkHash(string memory fileHash) public view returns (bool) {
        for (uint i = 0; i < hashes.length; i++) {
            if (compareStrings(fileHash, hashes[i])) {
                return true;
            }
        }
        return false;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // function setCompleted(uint completed) public restricted {
    //     last_completed_migration = completed;
    // }

    // let instance = await Diploanch.deployed()
    // let check1 = instance.addHash("C0F80792B990C9A384AC2609C107CCBB679CCDA4CD09F08B1B0131D2ED7586B8")
    // let check2 = instance.checkHash("C0F80792B990C9A384AC2609C107CCBB679CCDA4CD09F08B1B0131D2ED7586B8")
}
