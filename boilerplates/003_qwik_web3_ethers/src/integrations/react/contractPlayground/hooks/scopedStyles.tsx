/** @jsxRuntime automatic */
/** @jsxImportSource react */

import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

export type StylesContextType = Record<string, string>
type onStylesChange = Dispatch<SetStateAction<StylesContextType>>

const StylesContext = createContext<onStylesChange | undefined>(undefined)

export function ScopedStylesProvider(props: { children?: React.ReactNode }) {
  const [state, onStateChange] = useState<StylesContextType>({})

  const stylesContainers = Object.keys(state).map((key) => <StyleContainer key={key} value={state[key]} />)

  return (
    <StylesContext.Provider value={onStateChange}>
      <div>{stylesContainers}</div>
      {props.children}
    </StylesContext.Provider>
  )
}

function StyleContainer(props: { value: string }) {
  return <style>{props.value}</style>
}

function updateStylesNames(inlineStyles: string, containerName: string): string {
  // NOTE: csss ids `#myId` are not supported
  return inlineStyles.replace(/([.]\S+)/gm, '.' + containerName + '$1')
}

export function addScopedStyles(componentName: string, inlineStyles: string): Record<string, string> {
  const context = useContext<onStylesChange | undefined>(StylesContext)
  if (!context) {
    throw Error('useWeb3React can only be used within the Web3ReactProvider component')
  }

  const classAndIdNamesRaw = (inlineStyles.match(/[.]\S+/gm) as string[]) || []
  const classAndIdNames = [...new Set(classAndIdNamesRaw)]
  const styles = updateStylesNames(inlineStyles, componentName)

  useEffect(() => {
    context((currentContext) => {
      return {
        ...currentContext,
        [componentName]: styles,
      }
    })
  })

  const tmp = classAndIdNames.reduce((acc, name) => {
    return {
      ...acc,
      [name.replace(/[.#]/, '')]: componentName + ' ' + name.replace(/[.#]/, ''),
    }
  }, {})

  return tmp
}
