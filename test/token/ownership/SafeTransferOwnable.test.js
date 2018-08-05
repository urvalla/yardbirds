const { shouldBehaveLikeSafeTransferOwnable } = require('./SafeTransferOwnable.behaviour');

const SafeTransferOwnable = artifacts.require('SafeTransferOwnable');

contract('SafeTransferOwnable', function (accounts) {
  beforeEach(async function () {
    this.contract = await SafeTransferOwnable.new();
  });

  shouldBehaveLikeSafeTransferOwnable(accounts);
});
