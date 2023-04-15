const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    // TODO:

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer1 = ethers.provider.getSigner(0);
    const signer2=ethers.provider.getSigner(1);

    return { game, signer1, signer2 };
  }
  it('should be a winner', async function () {
    const { game, signer1, signer2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const address1 = await signer1.getAddress();
    const address2 = await signer2.getAddress();

    // needs to use signer 2 as the msg.sender to log the address as [y] and signer 1 as the msg.sender in the win()
    await game.connect(signer2).write(address1);
    await game.connect(signer1).win(address2);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
