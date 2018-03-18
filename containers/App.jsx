import React, {Component} from 'react'
import { connect } from 'react-redux'

import ListView from '../components/ListView.jsx'

import * as actions from '../redux/actions'

class App extends Component {
  componentDidMount () {
    this.props.getConnection()
    this.getConnectionInterval = setInterval(this.props.getConnection, 1000)
    this.handleMenuItemSelect = this.handleMenuItemSelect.bind(this)
  }

  componentWillUnmount () {
    clearInterval(this.getConnectionInterval)
  }

  handleMenuItemSelect (item) {
    switch (item) {
      case 'Disconnect':
        this.props.disconnect()
        break
    }
  }

  render () {
    if (!this.props.connection.port) {
      return <ListView items={this.props.connection.ports || []} onSelect={this.props.connect} />
    }
    return <ListView items={['Print', 'Control', 'Disconnect']} onSelect={this.handleMenuItemSelect} />
  }
}

function mapStateToProps (state) {
  return {
    connection: state.connection
  }
}

const mapDispatchToProps = {
  getConnection: actions.getConnection,
  connect: actions.connect,
  disconnect: actions.disconnect
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
