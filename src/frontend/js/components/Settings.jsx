import React, { useEffect, useContext } from 'react'

import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const Settings = () => {
  const { state } = useContext(MainContext)
  const { appName, versions } = state

  useEffect(() => {
    document.title = `Settings | ${appName}`
  }, [appName])

  console.log(versions)
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
        <div><b>tommy</b> v{state.appVersion}</div>
        {Object.keys(versions || {}).map((appName, key) => {
          const version = versions[appName]

          return (
            <div key={key}>
              <b>{appName}</b> v{version}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Settings
