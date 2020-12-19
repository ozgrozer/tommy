import React, { useState, useEffect, useContext } from 'react'

import apps from '~/apps.json'
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

  return (
    <div id='appStore'>
      <Header searchOnChange={searchOnChange} />

      <div className='apps'>
        {Object.keys(filteredApps).map(key => {
          const app = filteredApps[key]
          const appLogo = `https://raw.githubusercontent.com/${app.r}/master/logo.png`
          const appAuthor = app.r.split('/')[0]

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
                  {appAuthor}
                </div>

                <div className='appDescription'>
                  {app.d}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppStore
