/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react'
import { Web3ReactHooks, Web3ReactProvider as Web3ReactProviderRaw } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'

import { hooks as metaMaskHooks, metaMask } from '~/utils/connectors/metamask'

import { ScopedStylesProvider } from '../hooks/scopedStyles'
import { ContractPlaygroundReact } from './contractPlaygroundReact'

export const connectors: [MetaMask | WalletConnect | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  //[walletConnect, walletConnectHooks],
  //[network, networkHooks],
]

export const ContentWithWeb3ReactProvider = qwikify$(ContentWithWeb3ReactProviderRaw)

export function ContentWithWeb3ReactProviderRaw() {
  return (
    <Web3ReactProviderRaw connectors={connectors}>
      <ScopedStylesProvider>
        <ContractPlaygroundReact />
      </ScopedStylesProvider>
    </Web3ReactProviderRaw>
  )
}
