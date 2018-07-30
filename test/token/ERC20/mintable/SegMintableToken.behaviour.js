const { assertRevert } = require('../../../helpers/assertRevert');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

function shouldBehaveLikeSegMintableToken ([owner, nextMinter, anotherAccount]) {
  const accounts = {
    owner: owner,
    nextMinter: nextMinter,
    anotherAccount: anotherAccount
  }

  function withAccounts(accountNames, proc) {
    accountNames.forEach(function (accountName) {
      proc(accounts[accountName], accountName);
    })
  }

  describe('as a mintable token', function () {
    describe('after token creation', function () {
      it('sender should be token owner', async function () {
        const tokenOwner = await this.token.owner({ from: owner });
        tokenOwner.should.equal(owner);
      });

      it('sender should be token minter', async function () {
        const tokenMinter = await this.token.minter({ from: owner });
        tokenMinter.should.equal(owner);
      });
    });

    describe('.transferMinter', function () {
      it('changes minter after transfer', async function () {
        await this.token.transferMinter(nextMinter);
        const minter = await this.token.minter();

        minter.should.eq(nextMinter);
      });

      withAccounts(['nextMinter', 'anotherAccount'], function (account, accountName) {
        it('should prevent non-owners ('+accountName+') from transfering', async function () {
          const owner = await this.token.owner.call();
          owner.should.not.eq(account);
          await assertRevert(this.token.transferMinter(account, { from: account }));
        });
      });
    });

    describe('.mint', function () {
      const amount = 100;

      beforeEach(async function () {
        await this.token.transferMinter(nextMinter, { from: owner });
      });

      describe('when the sender has the minting permission', function () {
        it('mints the requested amount', async function () {
          await this.token.mint(owner, amount, { from: nextMinter });

          const balance = await this.token.balanceOf(owner);
          assert.equal(balance, amount);
        });

        it('emits a mint and a transfer event', async function () {
          const { logs } = await this.token.mint(owner, amount, { from: nextMinter });

          assert.equal(logs.length, 2);
          assert.equal(logs[0].event, 'Mint');
          assert.equal(logs[0].args.to, owner);
          assert.equal(logs[0].args.amount, amount);
          assert.equal(logs[1].event, 'Transfer');
        });
      });

      withAccounts(['owner', 'anotherAccount'], function (account, accountName) {
        describe('when the sender ('+accountName+') has not the minting permission', function () {
          it('reverts', async function () {
            await assertRevert(this.token.mint(account, amount, { account }));
          });
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeSegMintableToken,
};