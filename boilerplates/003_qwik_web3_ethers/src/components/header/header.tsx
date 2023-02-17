import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './header.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <header>
      <h1>Web3 demo</h1>
    </header>
  )
})
