import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom'

import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'

const Signup = (props) => {

	const { handleSubmit,
			submit,
			signup: {
				requesting,
				successful,
				messages,
				errors,
			} 
		} = props

	return (
		<div className="signup">
			{/* Use the Submit handler with our own submit handler*/}
			<form className="signup-form" onSubmit={handleSubmit(submit)}>
				<h1>Signup</h1>
				<label htmlFor="email">Email</label>
				<Field
					name="email"
					type="text"
					id="email"
					className="email"
					label="Email"
					component="input"
				/>
				<label htmlFor="password">Password</label>
				<Field
					name="password"
					type="password"
					id="password"
					className="password"
					label="Password"
					component="input"
				/>
				<label htmlFor="firstName">First Name</label>
				<Field
					name="firstName"
					type="text"
					id="firstName"
					className="firstName"
					label="First Name"
					component="input"
				/>
				<label htmlFor="lastName">Last Name</label>
				<Field
					name="lastName"
					type="text"
					id="lastName"
					className="lastName"
					label="Last Name"
					component="input"
				/>
				<button action="submit">SIGNUP</button>
			</form>
			<div className="auth-messages">

				{!requesting && !!errors.length && (
					<Errors message="Failure to signup due to:" errors={errors} />
				)}
				{!requesting && !!messages.length && (
					<Messages messages={messages} />
				)}
				{!requesting && successful && (
					<div>
						Signup Successful! <Link to="/login">Click here to Login »</Link>
					</div>
				)}
				{!requesting && !successful && (
					<Link to="/login">Already a member? Login Here</Link>
				)}
			</div>
	</div>
	)
}

export default Signup;