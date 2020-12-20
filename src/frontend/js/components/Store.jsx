import React, { useState, useEffect, useContext } from 'react'

import apps from '~/apps.json'
import Header from './Header'
import findInObject from '~/src/common/findInObject'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const Store = () => {
  const { state } = useContext(MainContext)
  const { installedApps } = state

  useEffect(() => {
    document.title = `Store | ${state.appName}`
  }, [])

  const [filteredApps, setFilteredApps] = useState(apps)
  const searchOnChange = e => {
    const searchTerm = e.target.value.toLowerCase()
    let newApps = {}
    if (searchTerm) {
      for (const key in apps) {
        const app = apps[key]
        const found = app.n.toLowerCase().includes(searchTerm) || app.d.toLowerCase().includes(searchTerm)
        if (found) newApps[app.id] = app
      }
    } else {
      newApps = apps
    }
    setFilteredApps(newApps)
  }

  const appButtonOnClick = props => {
    const { appId, appIsInstalled } = props

    if (appIsInstalled) {
      window.ipcRenderer.send('createAppWindow', { appId })
    }
  }

  return (
    <div id='store'>
      <Header
        searchOnChange={searchOnChange}
        searchInputPlaceholder='Search in Store'
      />

      <div className='apps'>
        {Object.keys(filteredApps).map((appId, key) => {
          const app = filteredApps[appId]
          const appLogo = `https://raw.githubusercontent.com/${app.r}/master/tommy-logo.png`
          const appAuthor = app.r.split('/')[0]
          const appIndex = findInObject({ object: installedApps, search: { id: appId } })
          const appIsInstalled = appIndex !== -1

          return (
            <div key={key} className='app'>
              <div
                className='appLogo'
                style={{ backgroundImage: `url(${appLogo})` }}
              />

              <div className='appDetails'>
                <div className='appName'>
                  {app.n}
                </div>

                <div className='appAuthor'>
                  @{appAuthor}
                </div>

                <div className='appDescription'>
                  {app.d}
                </div>
              </div>

              <button
                className='appButton'
                onClick={() => appButtonOnClick({ appId, appIsInstalled })}
              >
                {appIsInstalled ? 'Open' : 'Get'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Store
