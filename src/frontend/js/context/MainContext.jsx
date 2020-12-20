import React, { useState, createContext } from 'react'
import isElectron from 'is-electron'

const MainContext = createContext()

const MainProvider = props => {
  const [state, setState] = useState({
    appName: 'Tommy',
    installedApps: []
  })

  const _setState = newState => {
    setState(state => ({
      ...state,
      ...newState
    }))
  }

  const value = {
    state,
    setState: _setState
  }

  return (
    <MainContext.Provider value={value}>
      {props.children}
    </MainContext.Provider>
  )
}

export {
  MainContext,
  MainProvider
}
