pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyContract is ERC721 {
    constructor() 
    ERC721("SIMPLE", "SMPL")
    public {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }

    function _mint(address to) public {
        mint(to, totalSupply().add(1));
    }
}