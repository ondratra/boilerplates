/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { useWeb3React } from '@web3-react/core'

import { hardHatTestChain } from '~/utils/connectors/chains'

import { addScopedStyles } from '../hooks/scopedStyles'
import { ChainSwitch } from './chainSwitch'
import { default as stylesRaw } from './walletConnected.css?inline'

export function WalletConnected() {
  const { chainId, account, connector } = useWeb3React()
  const styles = addScopedStyles('WalletConnected', stylesRaw)

  const onDisconnectClick = () => {
    if (connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }

  const isHardHatTestChain = hardHatTestChain.chainId == chainId

  return (
    <div>
      <div className={styles.walletContainer}>
        <ChainSwitch />
        <div>Your account: {account}</div>
        <button type="button" onClick={onDisconnectClick}>
          Disconnect wallet
        </button>
      </div>

      <hr />

      {isHardHatTestChain ? <HardHatTestingAddressNotice /> : null}
    </div>
  )
}

function HardHatTestingAddressNotice() {
  return (
    <p>
      <b>Please make sure to import the testing account to your Metamask</b> (see this{' '}
      <a href="https://medium.com/publicaio/how-import-a-wallet-to-your-metamask-account-dcaba25e558d">tutorial</a>).{' '}
      <br />
      Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 <br />
      Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 <br />
    </p>
  )
}
