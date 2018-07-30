const { shouldBehaveLikeSegMintableFinishableToken } = require('./SegMintableFinishableToken.behaviour');
const { shouldBehaveLikeSegMintableToken } = require('./SegMintableToken.behaviour');

const SegMintableFinishableToken = artifacts.require('SegMintableFinishableToken');
const SegMintableToken = artifacts.require('SegMintableToken');

contract('SegMintableFinishableToken', function ([owner, minter, anotherAccount]) {

  beforeEach(async function () {
    this.token = await SegMintableFinishableToken.new({ from: owner });
  });

  shouldBehaveLikeSegMintableToken([owner, minter, anotherAccount]);
  shouldBehaveLikeSegMintableFinishableToken([owner, minter, anotherAccount]);
});