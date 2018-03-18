import React, {Component} from 'react'
import { connect } from 'react-redux'

import ListView from '../components/ListView.jsx'

class App extends Component {
  render () {
    if (this.props.connection.state === 'Closed') {
      return <ListView items={this.props.connection.ports} onSelect={v => console.log(v)} />
    }
    return <div>{this.props.connection.state}</div>
  }
}

function mapStateToProps (state) {
  return {
    connection: state.connection
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
