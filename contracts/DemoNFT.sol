// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.9;
  
import "erc721a/contracts/ERC721A.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DemoNFT is ERC721A, ReentrancyGuard, Ownable {  
    constructor() 
        ERC721A("DEMO NFT", "DEMONFT") Ownable() {} 
  
    function mint(uint256 quantity) external payable {  
        // _safeMint's second argument now takes in a quantity, not a tokenId.  
        _safeMint(msg.sender, quantity);  
    }  

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "MyERC721: URI query for nonexistent token");
        return string(abi.encodePacked("https://raw.githubusercontent.com/0xfffangel/demonft/master/assets/", Strings.toString(tokenId), ".json"));
    }
}