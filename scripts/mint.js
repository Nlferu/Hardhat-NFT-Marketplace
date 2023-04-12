const { ethers, network } = require("hardhat")
const { motherContract } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")

async function mint() {
    const basicNft = await ethers.getContractAt("BasicNftTwo", motherContract)
    console.log("Minting NFT...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    console.log(`Minted tokenId ${mintTxReceipt.events[0].args.tokenId.toString()} from contract: ${basicNft.address}`)
    if (network.config.chainId == 31337) {
        // Moralis has a hard time if you move more than 1 block!
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
