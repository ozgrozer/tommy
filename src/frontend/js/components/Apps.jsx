import React, { useState, useEffect, useContext } from 'react'

import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const Apps = () => {
  const { state } = useContext(MainContext)
  const { installedApps } = state

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

  return (
    <div id='apps'>
      <Header
        searchOnChange={searchOnChange}
        searchInputPlaceholder='Search in Apps'
      />

      <div className='apps'>
        {filteredApps.map((app, key) => {
          return (
            <div key={key} className='app'>
              <div className='appLogo' />
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
