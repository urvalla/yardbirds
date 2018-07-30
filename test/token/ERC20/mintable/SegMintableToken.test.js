const { shouldBehaveLikeSegMintableToken } = require('./SegMintableToken.behaviour');
const SegMintableToken = artifacts.require('SegMintableToken');

contract('SegMintableToken', function ([owner, nextMinter, anotherAccount]) {

  beforeEach(async function () {
    this.token = await SegMintableToken.new({ from: owner });
  });

  describe('SegMintableToken behaviour', function () {
    shouldBehaveLikeSegMintableToken([owner, nextMinter, anotherAccount]);
  });
});