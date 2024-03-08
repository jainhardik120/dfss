// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FileSharingSystem {
    mapping(string => mapping(address => bool)) public fileAccess;
    mapping(string => address) public fileOwners;

    event FilePermissionChanged(
        address indexed owner,
        string indexed file,
        address indexed user,
        bool accessGranted
    );
    event FileOwnershipTransferred(
        address indexed previousOwner,
        string indexed file,
        address indexed newOwner
    );

    modifier fileOwner(string memory _file) {
        require(
            msg.sender == fileOwners[_file],
            "You are not the owner of this file"
        );
        _;
    }

    function createFile(string memory _file) public {
        fileOwners[_file] = msg.sender;
        emit FileOwnershipTransferred(address(0), _file, msg.sender);
    }

    function transferOwnership(
        string memory _file,
        address _newOwner
    ) public fileOwner(_file) {
        require(_newOwner != address(0), "Invalid new owner address");
        fileOwners[_file] = _newOwner;
        emit FileOwnershipTransferred(msg.sender, _file, _newOwner);
    }

    function grantPermission(
        string memory _file,
        address _user
    ) public fileOwner(_file) {
        fileAccess[_file][_user] = true;
        emit FilePermissionChanged(msg.sender, _file, _user, true);
    }

    function revokePermission(
        string memory _file,
        address _user
    ) public fileOwner(_file) {
        fileAccess[_file][_user] = false;
        emit FilePermissionChanged(msg.sender, _file, _user, false);
    }

    function ownerOf(string memory _file) public view returns (address) {
        return fileOwners[_file];
    }
}
