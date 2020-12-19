import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'

import '~/src/frontend/css/app.scss'
import Dashboard from './components/Dashboard'
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
      <BrowserRouter>
        <ScrollToTopHoc>
          <Route path='/' exact component={Dashboard} />
        </ScrollToTopHoc>
      </BrowserRouter>
    </MainProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
