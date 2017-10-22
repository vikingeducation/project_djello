import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import PropTypes from 'prop-types';


const Login = ({ login }) => {
  return (
    <Container>
	<Row className="justify-content-center align-items-center" id="login-box">
		<Col md={8} lg={5} sm={10} >
		<Card className="p-5">
			<h1 className="text-center">Djello</h1>
			<CardBody>
			<Form onSubmit={login} >
				<FormGroup row>
				<Label for="email" className="sr-only">Email</Label>
				<Col>
				<Input name="auth[email]" type="email" placeholder="Email"></Input>
				</Col>
				</FormGroup>
					<FormGroup row>
				<Label for="password"className="sr-only">Email</Label>
				<Col>
				<Input name="auth[password]" type="password" placeholder="Password"></Input>
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

Login.propTypes = {
  login: PropTypes.func
};

export default Login