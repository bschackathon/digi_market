pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Monaliza is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory myName, string memory mySymbol) 
    ERC721(myName, mySymbol)
    public {}

    function mint(address to, string memory tokenURI) public returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

}

contract MonalizaContractFactory {
    address[] public contracts;
    address public lastContractAddress;  

    function getContractCount() public view returns(uint contractCount) {
        return contracts.length;
    }

    function deployNFTContract(string memory name, string memory symbol) public returns(address newContract){
         Monaliza c = new Monaliza(name,symbol);
         address cAddr = address(c);
         contracts.push(cAddr);
         lastContractAddress = cAddr;
         //c.mint(to, tokenURI);   
         return cAddr;
    }

    function mintNFT(Monaliza tokenAddress, address to, string memory tokenURI) public {

      tokenAddress.mint(to, tokenURI);
    }    

}
