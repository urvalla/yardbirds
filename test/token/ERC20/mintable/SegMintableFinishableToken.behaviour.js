const { assertRevert } = require('../../../helpers/assertRevert');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

function shouldBehaveLikeSegMintableFinishableToken ([owner, minter, anotherAccount]) {
  describe('.mintingFinished', function () {
    describe('when the token minting is not finished', function () {
      it('returns false', async function () {
        const mintingFinished = await this.token.mintingFinished();
        assert.equal(mintingFinished, false);
      });
    });

    describe('when the token is minting finished', function () {
      beforeEach(async function () {
        await this.token.finishMinting({ from: owner });
      });

      it('returns true', async function () {
        const mintingFinished = await this.token.mintingFinished();
        assert.equal(mintingFinished, true);
      });
    });
  });

  describe('.finishMinting', function () {
    describe('when the sender is the token owner', function () {
      const from = owner;

      describe('when the token minting was not finished', function () {
        it('finishes token minting', async function () {
          await this.token.finishMinting({ from });

          const mintingFinished = await this.token.mintingFinished();
          assert.equal(mintingFinished, true);
        });

        it('emits a mint finished event', async function () {
          const { logs } = await this.token.finishMinting({ from });

          assert.equal(logs.length, 1);
          assert.equal(logs[0].event, 'MintFinished');
        });
      });

      describe('when the token minting was already finished', function () {
        beforeEach(async function () {
          await this.token.finishMinting({ from });
        });

        it('reverts', async function () {
          await assertRevert(this.token.finishMinting({ from }));
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeSegMintableFinishableToken,
};