/* eslint react/jsx-fragments: 0 */

import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import isElectron from 'is-electron'
import { HashRouter, Route, withRouter } from 'react-router-dom'

import '~/src/frontend/css/app.scss'
import Apps from './components/Apps'
import TommyPages from './components/TommyPages'
import { MainProvider, MainContext } from '~/src/frontend/js/context/MainContext'

const ScrollToTop = props => {
  const { children, history } = props
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [history.location.pathname])
  return children
}
const ScrollToTopHoc = withRouter(ScrollToTop)

const Initialize = () => {
  const { setState } = useContext(MainContext)

  useEffect(() => {
    if (isElectron()) {
      window.ipcRenderer.on('initialize', (event, message) => {
        const { installedApps } = message
        setState({ installedApps })
      })
    }
  }, [])

  return (
    <React.Fragment>
      <Route path='/' exact component={Apps} />
      <Route path='/t/:page' exact component={TommyPages} />
    </React.Fragment>
  )
}

const App = () => {
  return (
    <MainProvider>
      <HashRouter>
        <ScrollToTopHoc>
          <Initialize />
        </ScrollToTopHoc>
      </HashRouter>
    </MainProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
