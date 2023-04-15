const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game};
    }


    it("should be a winner", async function () {
      const { game } = await loadFixture(deployContractAndSetVariables);
  
      // good luck
      const hardhatAccounts = networks.hardhat.accounts.count;
      const number = parseInt("0x00ffffffffffffffffffffffffffffffffffffff");
  
      for (let i = 0; i < hardhatAccounts; i++) {
        const signer = ethers.provider.getSigner(i);
        const myNumber = parseInt(await signer.getAddress());
        if (myNumber < number) {
          await game.connect(signer).win();
          break;
        }
      }
  
      // leave this assertion as-is
      assert(await game.isWon(), "You did not win the game");
    });

  });

