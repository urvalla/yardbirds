pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Segragated Mintable token
 * @dev ERC20 Token:
 * - With mintable token creation
 * - Segregated owner and minter
 * - Without explicit finish or pause (you can still set minter to zero-address to stop minting)
 * Based on code by OpenZeppelin: https://github.com/OpenZeppelin/zeppelin-solidity
 * which is based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 */
contract SegMintableToken is StandardToken, Ownable {
  event Mint(address indexed to, uint256 amount);
  event MinterTransferred(address indexed previousMinter, address indexed newMinter);

  address public minter;


  /**
   * @dev The SegMintableToken constructor sets the original `minter` of the contract to the sender
   * account.
   */
  constructor() public {
    minter = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the minter.
   */
  modifier hasMintPermission() {
    require(msg.sender == minter);
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
    hasMintPermission
    public
    returns (bool)
  {
    totalSupply_ = totalSupply_.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
    return true;
  }

  /**
   * @dev Allows the current minter to transfer control of the contract to a newMinter.
   * @param newMinter The address to become a new minter.
   */
  function transferMinter(address newMinter) public onlyOwner {
    require(newMinter != address(0));
    emit MinterTransferred(minter, newMinter);
    minter = newMinter;
  }
}