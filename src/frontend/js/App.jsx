import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, withRouter, Link } from 'react-router-dom'

// import '~/src/frontend/css/app.scss'
import './../css/app.scss'
import { MainProvider } from '~/src/frontend/js/context/MainContext'

const ScrollToTop = props => {
  const { children, history } = props
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [history.location.pathname])
  return children
}
const ScrollToTopHoc = withRouter(ScrollToTop)

const Index = () => {
  const apps = [
    { name: 'Settings', logo: 'x.jpg' },
    { name: 'Mail', logo: 'x.jpg' },
    { name: 'App Store', logo: 'x.jpg' },
    { name: 'Photos', logo: 'x.jpg' },
    { name: 'Maps', logo: 'x.jpg' },
    { name: 'Calendar', logo: 'x.jpg' },
    { name: 'Calculator', logo: 'x.jpg' },
    { name: 'Contacts', logo: 'x.jpg' },
    { name: 'Notes', logo: 'x.jpg' },
    { name: 'Files', logo: 'x.jpg' },
    { name: 'Shortcuts', logo: 'x.jpg' },
    { name: 'Health', logo: 'x.jpg' },
    { name: 'Clock', logo: 'x.jpg' }
  ]

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

        <Link to='/t/app-store' className='iconWrapper'>
          <i className='icon icon-storefront' />
        </Link>

        <Link to='/t/settings' className='iconWrapper'>
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

const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <ScrollToTopHoc>
          <Route path='/' component={Index} />
        </ScrollToTopHoc>
      </BrowserRouter>
    </MainProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
