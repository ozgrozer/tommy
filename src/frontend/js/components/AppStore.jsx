import React, { useEffect, useContext } from 'react'

import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const AppStore = () => {
  const { state } = useContext(MainContext)

  useEffect(() => {
    document.title = `App Store | ${state.appName}`
  }, [])

  const searchOnChange = () => {
    console.log('searchOnChange')
  }

  return (
    <div id='appStore'>
      <Header searchOnChange={searchOnChange} />

      <div className='content'>
        appStore
      </div>
    </div>
  )
}

export default AppStore
