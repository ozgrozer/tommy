import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, withRouter } from 'react-router-dom'

import '~/src/frontend/css/app.scss'
import Home from './components/Home'
import TommyPages from './components/TommyPages'
import { MainProvider } from '~/src/frontend/js/context/MainContext'

const ScrollToTop = props => {
  const { children, history } = props
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [history.location.pathname])
  return children
}
const ScrollToTopHoc = withRouter(ScrollToTop)

const App = () => {
  return (
    <MainProvider>
      <HashRouter>
        <ScrollToTopHoc>
          <Route path='/' exact component={Home} />
          <Route path='/t/:page' exact component={TommyPages} />
        </ScrollToTopHoc>
      </HashRouter>
    </MainProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
