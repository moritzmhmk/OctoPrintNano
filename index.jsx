import React from 'react'
import {render} from 'react-dom'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'

const store = configureStore({})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
