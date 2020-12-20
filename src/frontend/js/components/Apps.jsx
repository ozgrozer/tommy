import React, { useState, useEffect, useContext } from 'react'

import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const path = require('path')

const Apps = () => {
  const { state } = useContext(MainContext)
  const { userDataPath, installedApps } = state

  useEffect(() => {
    document.title = `Apps | ${state.appName}`
  }, [])

  const apps = installedApps || []
  const [filteredApps, setFilteredApps] = useState(apps)
  const searchOnChange = e => {
    const searchTerm = e.target.value.toLowerCase()
    let newApps = []
    if (searchTerm) {
      for (const key in apps) {
        const app = apps[key]
        const found = app.name.toLowerCase().includes(searchTerm)
        if (found) newApps.push(app)
      }
    } else {
      newApps = apps
    }
    setFilteredApps(newApps)
  }
  useEffect(() => setFilteredApps(apps), [apps])

  const appButtonOnClick = appId => {
    window.ipcRenderer.send('createAppWindow', { appId })
  }

  return (
    <div id='apps'>
      <Header
        searchOnChange={searchOnChange}
        searchInputPlaceholder='Search in Apps'
      />

      <div className='apps'>
        {filteredApps.map((app, key) => {
          const appPath = path.join(userDataPath, 'apps', app.id, app.version)
          const logoPath = encodeURI('file-protocol://' + path.join(appPath, 'tommy-logo.png'))

          return (
            <div
              key={key}
              className='app'
              onDoubleClick={() => appButtonOnClick(app.id)}
            >
              <div
                className='appLogo'
                style={{ color: 'red', backgroundImage: `url(${logoPath})` }}
              />
              <div className='appName'>
                {app.name}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Apps
