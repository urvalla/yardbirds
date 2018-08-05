pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

/**
 * @title Ownable
 * @dev Ownable contract with two-step ownership transfer. The new owner should accept ownership to prevent
 * transferring to wrong address.
 */
contract SafeTransferOwnable is Ownable {
  address public newOwner;


  event OwnershipProposed(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev Allows the current owner to propose control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    newOwner = _newOwner;
    emit OwnershipProposed(owner, newOwner);
  }

  /**
   * @dev Allows the proposed newOwner to accept control of the contract.
   */
  function acceptOwnership() public {
      require(msg.sender == newOwner);
      emit OwnershipTransferred(owner, newOwner);
      owner = newOwner;
      newOwner = address(0);
  }
}