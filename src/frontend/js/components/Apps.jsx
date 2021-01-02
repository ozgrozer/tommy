/* eslint react/jsx-fragments: 0 */

import React, { useState, useEffect, useContext } from 'react'

import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const path = require('path')

const FilteredApps = props => {
  const { userDataPath, filteredApps } = props

  const openApp = appId => {
    window.ipcRenderer.send('openApp', appId)
  }

  return (
    <div className='apps'>
      {filteredApps.map((app, key) => {
        const appPath = path.join(userDataPath, 'apps', app.id, app.version)
        const logoPath = encodeURI('file-protocol://' + path.join(appPath, 'tommy-logo.png'))

        return (
          <div
            key={key}
            className='app'
            onDoubleClick={() => openApp(app.id)}
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
  )
}

const Apps = () => {
  const { state } = useContext(MainContext)
  const { appName, userDataPath, installedApps } = state

  useEffect(() => {
    document.title = `Apps | ${appName}`
  }, [appName])

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

  return (
    <div id='apps'>
      <Header
        searchOnChange={searchOnChange}
        searchInputPlaceholder='Search in Apps'
      />

      {Object.keys(filteredApps).length
        ? <FilteredApps userDataPath={userDataPath} filteredApps={filteredApps} />
        : <div className='infoBox'>No apps installed yet</div>
      }
    </div>
  )
}

export default Apps
