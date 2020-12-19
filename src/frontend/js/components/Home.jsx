import React, { useState } from 'react'

import Header from './Header'

const Home = () => {
  const apps = []

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

  return (
    <div id='home'>
      <Header searchOnChange={searchOnChange} />

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

export default Home
