import React from 'react'

import Header from './Header'

const Settings = () => {
  const searchOnChange = () => {
    console.log('searchOnChange')
  }

  return (
    <div id='settings'>
      <Header searchOnChange={searchOnChange} />

      <div className='content'>
        settings
      </div>
    </div>
  )
}

export default Settings
