import type { AddEthereumChainParameter } from '@web3-react/types'

const currencyEth: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}
const currencyHardHatEth: AddEthereumChainParameter['nativeCurrency'] = {
  ...currencyEth,
  symbol: 'hhETH', // MetaMask complains when 'ETH' symbol is used for HH testing network
}

export const hardHatTestChain = {
  chainId: 31337,
  chainName: 'HardHat testnet',
  nativeCurrency: currencyHardHatEth,
  rpcUrls: ['http://127.0.0.1:8545/'],
}

export const chainList: AddEthereumChainParameter[] = [
  {
    chainId: 1,
    chainName: 'Mainnet',
    nativeCurrency: currencyEth,
    rpcUrls: ['https://cloudflare-eth.com'],
  },
  hardHatTestChain,
]
