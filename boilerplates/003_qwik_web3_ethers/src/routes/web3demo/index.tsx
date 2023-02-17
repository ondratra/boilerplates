import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { DocumentHead } from '@builder.io/qwik-city'

import { ContentWithWeb3ReactProvider } from '~/integrations/react/contractPlayground/components/contentWithWeb3ReactProvider'

import styles from './web3demo.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <>
      <p>
        This demo shows how to connect the MetaMask web3 wallet to the webpage, switch a network, deploy a smart
        contract and read its data and interact with it.
      </p>
      <ContentWithWeb3ReactProvider client:visible />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Web3 Demo',
}
