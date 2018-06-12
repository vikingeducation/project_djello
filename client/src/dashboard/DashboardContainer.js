import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'

import { dataRequest } from './actions';

class DashboardContainer extends Component {

	componentDidMount() {
		this.props.dataRequest({
			user: {
				_id: 'H1sp8onlm'
			}
		})
	}



	render() {
		return (
			<Dashboard />
		)
	}

}

const mapStateToProps = state => ({  
  client: state.client,
  data: state.data,
})

// Make the Client and Board available in the props as well
// as the boardCreate() function
const connected = connect(mapStateToProps, { dataRequest })(DashboardContainer)  

export default connected;  
