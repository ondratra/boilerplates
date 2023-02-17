import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { assert, expect } from 'chai'
import { ethers } from 'hardhat'

describe('MyFungibleToken', () => {
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, userAccount1, userAccount2] = await ethers.getSigners()

    const initialSupply = 1000

    const MyFungibleToken = await ethers.getContractFactory('MyFungibleToken')
    const myFungibleToken = await MyFungibleToken.deploy(
      'My Testing ERC20 token',
      'MTERC20',
      initialSupply
    )

    await myFungibleToken.deployed()

    return { myFungibleToken, owner, userAccount1, userAccount2 }
  }

  it('can be deployed', async () => {
    await loadFixture(deployContract)
  })

  it('can add to whitelist', async () => {
    const { myFungibleToken, owner, userAccount1 } = await loadFixture(
      deployContract
    )

    assert.equal(await myFungibleToken.whitelist(userAccount1.address), false)

    await myFungibleToken.connect(owner).addToWhitelist(userAccount1.address)

    assert.equal(await myFungibleToken.whitelist(userAccount1.address), true)
  })

  it('forbids sending to non-whitelisted address', async () => {
    const { myFungibleToken, owner, userAccount1 } = await loadFixture(
      deployContract
    )

    const amount = 10

    assert.equal(await myFungibleToken.balanceOf(userAccount1.address), 0)

    await expect(
      myFungibleToken.connect(owner).transfer(userAccount1.address, amount)
    ).to.be.revertedWith('User not whitelisted')

    assert.equal(await myFungibleToken.balanceOf(userAccount1.address), 0)
  })

  it('allows sending to whitelisted address', async () => {
    const { myFungibleToken, owner, userAccount1 } = await loadFixture(
      deployContract
    )

    const amount = 10

    assert.equal(await myFungibleToken.balanceOf(userAccount1.address), 0)

    await myFungibleToken.connect(owner).addToWhitelist(userAccount1.address)

    await myFungibleToken.connect(owner).transfer(userAccount1.address, amount)

    assert.equal(await myFungibleToken.balanceOf(userAccount1.address), amount)
  })
})
