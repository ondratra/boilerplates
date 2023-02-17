import { component$, Slot } from '@builder.io/qwik'

import Header from '../components/header/header'

//import {TableApp} from '../integrations/react/mui'

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer></footer>
    </>
  )
})
