import React, { Component } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'
import { getUser } from '../actions/userActions'


const mapStateToProps = (state) => {
  console.log('AppContainer', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => {
      dispatch(getUser())
    }
  }
}

class AppContainer extends Component {
  componentDidMount() {
    console.log('componetn did mount')
    this.props.getUser()
  }

  render() {
    return (
      <App {...this.props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)