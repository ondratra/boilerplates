/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { useWeb3React } from '@web3-react/core'

import { chainList } from '~/utils/connectors/chains'

import { addScopedStyles } from '../hooks/scopedStyles'
import { ChainSelector } from './chainSelector'
import { default as stylesRaw } from './chainSwitch.css?inline'

export function ChainSwitch() {
  const { chainId } = useWeb3React()

  const activeChain = chainList.find((item) => item.chainId == chainId)

  const styles = addScopedStyles('ChainSwitch', stylesRaw)

  return (
    <div>
      Active chain: <br />
      <div className={styles.activeChainContainer}>
        Chain name: {activeChain ? activeChain.chainName : 'Unknown chain'} <br />
        ChainId: {chainId}
      </div>
      Available chains:
      <div className={styles.availableChainsContainer}>
        {chainList.map((item) => (
          <div key={item.chainId}>
            - <ChainSelector chainInfo={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
