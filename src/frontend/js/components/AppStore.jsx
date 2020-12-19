import React, { useState, useEffect, useContext } from 'react'

import apps from '~/apps.json'
import installed from '~/installed.json'
import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const AppStore = () => {
  const { state } = useContext(MainContext)

  useEffect(() => {
    document.title = `App Store | ${state.appName}`
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

  const appButtonOnClick = appId => {
    const appIsInstalled = Object.prototype.hasOwnProperty.call(installed, appId)
    console.log({ appIsInstalled })
  }

  return (
    <div id='appStore'>
      <Header searchOnChange={searchOnChange} />

      <div className='apps'>
        {Object.keys(filteredApps).map((appId, key) => {
          const app = filteredApps[appId]
          const appLogo = `https://raw.githubusercontent.com/${app.r}/master/logo.png`
          const appAuthor = app.r.split('/')[0]
          const appIsInstalled = Object.prototype.hasOwnProperty.call(installed, appId)

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
                onClick={() => appButtonOnClick(appId)}
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

export default AppStore
