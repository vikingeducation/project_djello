import React, {Component} from 'react'
import { connect } from "react-redux";
import App from "../components/App";
import {getUser} from '../actions/userActions.js'
import { withRouter } from 'react-router-dom'

class AppContainer extends Component {
  componentDidMount() {
    this.props.getUser('59c01244a6a1af102a96e835');
  }
  render() {
    const {user, isFetching} = this.props.userReducer;
    return <App user={user} isFetching={isFetching} />
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id)=>{
      dispatch(getUser(id))
    }
  }  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps
  )(AppContainer));