/* eslint react/jsx-fragments: 0 */

import React from 'react'
import { Route } from 'react-router-dom'

import Store from './Store'
import Settings from './Settings'

const TommyPages = () => {
  return (
    <React.Fragment>
      <Route path='/t/store' component={Store} />
      <Route path='/t/settings' component={Settings} />
    </React.Fragment>
  )
}

export default TommyPages
