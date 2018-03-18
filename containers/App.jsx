import React, {Component} from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render () {
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
