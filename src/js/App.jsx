import React from 'react'
import ReactDOM from 'react-dom'

import './../css/app.scss'

const App = () => {
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

  return (
    <div id='app'>
      <input type='text' className='searchInput' placeholder='Search' />

      <div className='apps'>
        {apps.map((app, key) => {
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

ReactDOM.render(<App />, document.getElementById('root'))
