import React from 'react'

import Header from './Header'

const AppStore = () => {
  const searchOnChange = () => {
    console.log('searchOnChange')
  }

  return (
    <div id='appStore'>
      <Header searchOnChange={searchOnChange} />

      <div className='content'>
        appStore
      </div>
    </div>
  )
}

export default AppStore
