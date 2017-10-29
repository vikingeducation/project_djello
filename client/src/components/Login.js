import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardBody, Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap'
import PropTypes from 'prop-types';
import ValidationErrorMessage from './ValidationErrorMessage'
import { validateLogin } from '../helpers/login'
import serialize from 'form-serialize'

const isValid = (value) => {
  return value ? false : null
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: {},
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = serialize(form, { hash: true })
    const formErrors = validateLogin(data)
    if (formErrors) {
      this.setState({ feedback: formErrors || {} })
    } else {
      this.setState({ feedback: formErrors || {} },
        this.props.login(data))
    }
  }


  render() {

    const { feedback } = this.state
    const invalidLogin = this.props.error ?
      (<p className="text-danger">Couldn't log you in: No user with those login details found. Please try a different combination.</p>) :
      ''


    return (
      <Container>
	<Row className="justify-content-center align-items-center" id="login-box">
		<Col md={8} lg={5} sm={10} >
		<Card className="p-5">
			<h1 className="text-center">Djello</h1>
			<CardBody>
		{invalidLogin}
			<Form onSubmit={this.onSubmit} >
				<FormGroup row>
				<Label for="email" className="sr-only">Email</Label>
				<Col>
				<Input name="email" type="email" placeholder="Email" valid={isValid(feedback['email'])} ></Input>
				<ValidationErrorMessage message={feedback['email']} />
				</Col>
				</FormGroup>
					<FormGroup row>
				<Label for="password"className="sr-only">Email</Label>
				<Col>
				<Input name="password" type="password" placeholder="Password" valid={isValid(feedback['password'])}></Input>
				<ValidationErrorMessage message={feedback['password']}></ValidationErrorMessage>
				</Col>
				</FormGroup>
				<Button color="primary">Login</Button>
			</Form>
			</CardBody>
		</Card>
		</Col>	
	</Row>
</Container>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  feedback: PropTypes.object
};

export default Login