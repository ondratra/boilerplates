import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  paths: {
    // `sources` targeting "./src/contracts" causes compilation error, change it after this bug is fixed
    // https://github.com/dethcrypto/TypeChain/issues/772
    //sources: "./src/contracts",
    sources: "./src",

    tests: "./src/tests",
    cache: "./dist/cache",
    artifacts: "./dist/artifacts"
  },
  typechain: {
    outDir: "./dist/typechain",
    target: "ethers-v5",
  },
}

export default config
