const { shouldBehaveLikeSegMintableFinishableToken } = require('./SegMintableFinishableToken.behaviour');
const { shouldBehaveLikeSegMintableToken } = require('./SegMintableToken.behaviour');

const SegMintableFinishableToken = artifacts.require('SegMintableFinishableToken');

contract('SegMintableFinishableToken', function ([owner, minter, anotherAccount]) {
  beforeEach(async function () {
    this.token = await SegMintableFinishableToken.new({ from: owner });
  });

  describe('SegMintableToken behaviour', function () {
    shouldBehaveLikeSegMintableToken([owner, minter, anotherAccount]);
  });

  describe('SegMintableFinishableToken behaviour', function () {
    beforeEach(async function () {
      await this.token.transferMinter(minter, { from: owner });
    });

    shouldBehaveLikeSegMintableFinishableToken([owner, minter, anotherAccount]);
  });
});
