import React, { Component } from 'react';
import { connect } from 'react-redux'
import { cardCreate } from '../card/actions'
import { Container, Fa, Input, Col, Row, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class CardCreate extends Component {

	constructor(props){
		super(props)
		this.state = {
			modal: false,
			name: '',
			description: '',
		}
	};
	
	handleToggleModal = (e) => {
		this.setState({
			modal: !this.state.modal
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.cardCreate(this.props.client, this.props.list, { title: this.state.name, description: this.state.description, listId: this.props.list._id });
		this.setState({
			modal: false
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {

		return (
				<div>
					<Button className="col" onClick={this.handleToggleModal} size="sm" color="primary">Add Card</Button>
					<Modal isOpen={this.state.modal} toggle={this.handleToggleModal} className="cascading-modal">
						<div className="modal-header primary-color white-text">
							<h4 className="title">Create New Card</h4>
						</div>
						<form onSubmit={this.handleSubmit}>
					<ModalBody className="grey-text">
				      <label htmlFor="cardName" className="grey-text font-weight-light">Card Name</label>
				      <input type="text" id="cardName" name="name"className="form-control" onChange={this.handleChange}/>
				      <br/>
				      <label htmlFor="cardDescription" className="grey-text font-weight-light">Card Description</label>
				      <input type="text" id="cardDescription" name="description"className="form-control" onChange={this.handleChange}/>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.handleToggleModal}>Close</Button>{' '}
						<Button color="primary" type="submit">Save</Button>
					</ModalFooter>
					</form>
					</Modal>
				</div>
     
			)
	}
}

const mapStateToProps = state => ({  
	client: state.client,
})

const connected = connect(mapStateToProps, { cardCreate })(CardCreate)  

export default connected; 