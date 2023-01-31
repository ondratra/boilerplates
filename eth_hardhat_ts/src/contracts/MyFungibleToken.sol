// SPDX-License-Identifier: GPLv3

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyFungibleToken is ERC20, Ownable {

    mapping(address => bool) public whitelist;

    constructor(string memory name_, string memory symbol_, uint256 _initialSupply) ERC20(name_, symbol_) {
        _mint(msg.sender, _initialSupply);
    }

    modifier isWhitelisted(address whitelistAddress) virtual {
        require(whitelist[whitelistAddress], "User not whitelisted");

        _;
    }

    function addToWhitelist(address whitelistedAddress) public virtual onlyOwner {
        whitelist[whitelistedAddress] = true;
    }

    function transfer(address to, uint256 amount) public virtual override isWhitelisted(to) returns (bool) {
        return ERC20.transfer(to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override isWhitelisted(to) returns (bool) {
        return ERC20.transferFrom(from, to, amount);
    }
}
