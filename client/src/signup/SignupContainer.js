import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'  
import { connect } from 'react-redux'

import Signup from './Signup';

import signupRequest from './actions'

class SignupContainer extends Component {

	static propTypes = {
		handleSubmit: PropTypes.func,
		signupRequest: PropTypes.func,
		signup: PropTypes.object
	}

	submit = (values) => {
		this.props.signupRequest(values);
	}

	render() {

		const { handleSubmit, signup } = this.props;

		return (
			<Signup 
				submit={this.submit}
				handleSubmit={handleSubmit}
				signup={signup}
			/>
		)
	}
}

const mapStateToProps = state => ({  
	signup: state.signup,
})

const connected = connect(mapStateToProps, { signupRequest })(SignupContainer);

const formed = reduxForm({  
	form: 'signup',
})(connected)

export default formed
