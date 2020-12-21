/* eslint react/jsx-fragments: 0 */

import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, withRouter } from 'react-router-dom'

import '~/src/frontend/css/app.scss'
import Apps from './components/Apps'
import TommyPages from './components/TommyPages'
import findInObject from '~/src/common/findInObject'
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
  const { state, setState } = useContext(MainContext)
  const { appIsOnProcess, installedApps } = state

  useEffect(() => {
    window.ipcRenderer.on('initialize', (event, message) => {
      const { userDataPath, installedApps } = message
      setState({ userDataPath, installedApps })
    })

    window.ipcRenderer.on('appDownloaded', (event, installedApp) => {
      appIsOnProcess[installedApp.id] = false
      installedApps.push(installedApp)
      setState({ installedApps, appIsOnProcess })
    })

    window.ipcRenderer.on('appRemoved', (event, appId) => {
      const appIndex = findInObject({ object: installedApps, search: { id: appId } })
      appIsOnProcess[appId] = false
      installedApps.splice(appIndex, 1)
      setState({ installedApps, appIsOnProcess })
    })
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
