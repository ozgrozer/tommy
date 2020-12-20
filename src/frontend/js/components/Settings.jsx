import React, { useEffect, useContext } from 'react'

import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const Settings = () => {
  const { state } = useContext(MainContext)

  useEffect(() => {
    document.title = `Settings | ${state.appName}`
  }, [])

  const searchOnChange = () => {
    console.log('searchOnChange')
  }

  return (
    <div id='settings'>
      <Header
        searchOnChange={searchOnChange}
        searchInputPlaceholder='Search in Settings'
      />

      <div className='content'>
        Settings
      </div>
    </div>
  )
}

export default Settings
