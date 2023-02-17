/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { useWeb3React } from '@web3-react/core'

export function WalletDisconnected() {
  const { connector } = useWeb3React()

  const onConnectClick = () => {
    connector.activate()
  }

  return (
    <>
      Wallet is disconnected
      <button type="button" onClick={onConnectClick}>
        Connect
      </button>
    </>
  )
}
