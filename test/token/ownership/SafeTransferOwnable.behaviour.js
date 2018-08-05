const { assertRevert } = require('../../helpers/assertRevert');

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

require('chai')
  .should();

function shouldBehaveLikeSafeTransferOwnable (accounts) {
  const owner = accounts[0];
  const recipient = accounts[1];
  const other = accounts[2];

  describe('as an ownable', function () {
    it('should have an owner', async function () {
      const currentOwner = await this.contract.owner();
      currentOwner.should.not.eq(ZERO_ADDRESS);
    });
  });

  describe('as an ownable with safe transfer', function () {
    describe('.transfer', function () {
      it('changes newOwner', async function () {
        await this.contract.transferOwnership(recipient, { from: owner });
        const newOwner = await this.contract.newOwner();
        newOwner.should.eq(recipient);
      });

      it('emits OwnershipProposed event', async function () {
        const { logs } = await this.contract.transferOwnership(recipient, { from: owner });

        assert.equal(logs.length, 1);
        assert.equal(logs[0].event, 'OwnershipProposed');
        assert.equal(logs[0].args.previousOwner, owner);
        assert.equal(logs[0].args.newOwner, recipient);
      });

      it('should prevent non-owners from transfering', async function () {
        [recipient, other].forEach(async function (account) {
          await assertRevert(
            this.contract.transferOwnership(recipient, { from: account })
          );
        });
      });

      it('amends newOwner', async function () {
        await this.contract.transferOwnership(other, { from: owner });
        await this.contract.transferOwnership(recipient, { from: owner });
        const newOwner = await this.contract.newOwner();
        newOwner.should.eq(recipient);
      });
    });

    describe('.acceptOwnership', function () {
      beforeEach(async function () {
        await this.contract.transferOwnership(recipient, { from: owner });
      });

      it('changes owner after acceptOwnership', async function () {
        await this.contract.acceptOwnership({ from: recipient });

        const newOwner = await this.contract.newOwner();
        const currentOwner = await this.contract.owner();

        newOwner.should.eq(ZERO_ADDRESS);
        currentOwner.should.eq(recipient);
      });

      it('emits OwnershipTransferred event', async function () {
        const { logs } = await this.contract.acceptOwnership({ from: recipient });

        assert.equal(logs.length, 1);
        assert.equal(logs[0].event, 'OwnershipTransferred');
        assert.equal(logs[0].args.previousOwner, owner);
        assert.equal(logs[0].args.newOwner, recipient);
      });

      it('should prevent not proposed accounts from accepting', async function () {
        [owner, other].forEach(async function (account) {
          await assertRevert(
            await this.contract.acceptOwnership({ from: account })
          );
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeSafeTransferOwnable,
};