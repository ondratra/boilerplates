/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { useWeb3React } from '@web3-react/core'
import type { AddEthereumChainParameter } from '@web3-react/types'

import { addScopedStyles } from '../hooks/scopedStyles'
import { default as stylesRaw } from './chainSelector.css?inline'

export function ChainSelector(props: { chainInfo: AddEthereumChainParameter }) {
  const { chainId: activeChainId, connector } = useWeb3React()
  const styles = addScopedStyles('ChainSelector', stylesRaw)

  const isActiveChain = activeChainId == props.chainInfo.chainId

  const onClick = () => {
    connector.activate(props.chainInfo)
  }

  return (
    <span className={isActiveChain ? styles.activeChainContainer : ''}>
      {props.chainInfo.chainName}
      {isActiveChain ? (
        ' (Active)'
      ) : (
        <button onClick={onClick} className={styles.switchButton}>
          Switch to this network
        </button>
      )}
    </span>
  )
}
