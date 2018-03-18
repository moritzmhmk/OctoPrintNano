import React from 'react'
import {render} from 'react-dom'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'

import {getConnection, getFiles, getJob, getPrinter} from './redux/actions'

const store = configureStore()

store.dispatch(getConnection())
store.dispatch(getFiles())
store.dispatch(getJob())
store.dispatch(getPrinter())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
