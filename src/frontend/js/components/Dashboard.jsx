import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
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
    <div id='app'>
      <div className='header'>
        <input
          type='text'
          placeholder='Search'
          className='searchInput'
          onChange={searchOnChange}
        />

        <Link to='/app-store' className='iconWrapper'>
          <i className='icon icon-storefront' />
        </Link>

        <Link to='/settings' className='iconWrapper'>
          <i className='icon icon-settings' />
        </Link>
      </div>

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

export default Dashboard
