pragma solidity ^0.4.24;

import "./SegMintableToken.sol";


/**
 * @title Segragated Mintable Finishable token
 * @dev ERC20 Token:
 * - with mintable token creation (inherited)
 * - segregated owner and minter (inherited)
 * - minting can be finished once
 * Based on code by OpenZeppelin: https://github.com/OpenZeppelin/zeppelin-solidity
 * which is based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 */
contract SegMintableFinishableToken is SegMintableToken {
  event MintFinished();

  bool public mintingFinished = false;


  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  /**
   * @dev Function to mint tokens
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(
    address _to,
    uint256 _amount
  )
    public
    canMint
    returns (bool)
  {
    return super.mint(_to, _amount);
  }

  /**
   * @dev Function to stop minting new tokens.
   * @return True if the operation was successful.
   */
  function finishMinting()
    public
    onlyOwner
    canMint
    returns (bool)
  {
    mintingFinished = true;
    emit MintFinished();
    return true;
  }
}