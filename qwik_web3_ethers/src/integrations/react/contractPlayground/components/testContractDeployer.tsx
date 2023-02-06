/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { Contract, ContractFactory } from 'ethers'

import { ContractExtendedInfo } from '../ContractExtendedInfo'
import { lockContractJson, noGasLimit } from '../utils'

export function TestContractDeployer(props: { onContractDeploy: (contractInfo: ContractExtendedInfo) => void }) {
  const { provider } = useWeb3React() as { provider: Web3Provider }

  const ONE_GWEI = 1_000_000_000
  const ONE_MINUTE = 60

  const lockedAmount = ONE_GWEI
  const unlockTime = Math.floor(Date.now() / 1000) + ONE_MINUTE

  const deployArgs = unlockTime
  const factory = new ContractFactory(lockContractJson.abi, lockContractJson.bytecode, provider.getSigner())

  const onClick = async () => {
    const contract = await factory.deploy(deployArgs, { value: lockedAmount, ...noGasLimit })

    await contract.deployTransaction.wait()

    const betterContract = new Contract(contract.address, lockContractJson.abi, provider.getSigner())

    props.onContractDeploy({
      name: lockContractJson.contractName,
      contract: betterContract,
    })
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick()
      }}
    >
      Deploy Test Contract
    </button>
  )
}
