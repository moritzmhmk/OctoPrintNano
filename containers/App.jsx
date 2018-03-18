import React, {Component} from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    return <div>OctoPrintNano</div>
  }
}

function mapStateToProps (state) {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
