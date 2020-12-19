/* eslint react/jsx-fragments: 0 */

import React from 'react'
import { Route } from 'react-router-dom'

import AppStore from './AppStore'
import Settings from './Settings'

const TommyPages = () => {
  return (
    <React.Fragment>
      <Route path='/t/app-store' component={AppStore} />
      <Route path='/t/settings' component={Settings} />
    </React.Fragment>
  )
}

export default TommyPages
