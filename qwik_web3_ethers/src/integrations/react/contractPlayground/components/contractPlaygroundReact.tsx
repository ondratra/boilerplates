/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

import { ContractExtendedInfo } from '../ContractExtendedInfo'
import { addScopedStyles } from '../hooks/scopedStyles'
import { default as stylesRaw } from './contractPlaygroundReact.css?inline'
import { DeployedContractList } from './deployedContractList'
import { TestContractDeployer } from './testContractDeployer'
import { WalletConnected } from './walletConnected'
import { WalletDisconnected } from './walletDisconnected'

export function ContractPlaygroundReact() {
  const { isActive, connector } = useWeb3React()
  const [deployedContracts, onDeployedContractsChange] = useState<ContractExtendedInfo[]>([])

  const styles = addScopedStyles('ContractPlaygroundReact', stylesRaw)

  useEffect(() => {
    if (connector.connectEagerly) {
      connector.connectEagerly()
    }
  }, [connector])

  return (
    <div className={styles.contractPlaygroundContainer}>
      <hr />
      Your Web3 wallet information:
      <div>
        <b>Status:</b> {isActive ? 'Connected' : 'Disconnected'}
      </div>
      {isActive ? <WalletConnected /> : <WalletDisconnected />}
      {isActive ? (
        <>
          <hr /> You can deploy one or more test contracts here. The demo contract locks a small amount of ETH that you
          send during deployment and prevents you from withdrawing that ETH for 60 seconds.
          <p className={styles.deploymentWarning}>
            Make sure you are on testnet before using this or it will cost you real ETH!!!
          </p>
          <TestContractDeployer
            onContractDeploy={(contractInfo) => onDeployedContractsChange([...deployedContracts, contractInfo])}
          />
        </>
      ) : null}
      <hr />
      <DeployedContractList contracts={deployedContracts} />
    </div>
  )
}
