import React, { Component } from 'react';
import { connect } from 'react-redux'
import { listCreate } from '../list/actions'
import { Container, Fa, Input, Col, Row, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class ListCreate extends Component {

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
		this.props.listCreate(this.props.client, { title: this.state.name, description: this.state.description, boardId: this.props.board._id });
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
			<Row>
				<Col>
					<Button color="info" onClick={this.handleToggleModal}>New List</Button>
					<Modal isOpen={this.state.modal} toggle={this.handleToggleModal} className="cascading-modal">
						<div className="modal-header primary-color white-text">
							<h4 className="title">Create New List</h4>
						</div>
						<form onSubmit={this.handleSubmit}>
					<ModalBody className="grey-text">
				      <label htmlFor="listName" className="grey-text font-weight-light">List Name</label>
				      <input type="text" id="listName" name="name"className="form-control" onChange={this.handleChange}/>
				      <br/>
				      <label htmlFor="listDescription" className="grey-text font-weight-light">List Description</label>
				      <input type="text" id="listDescription" name="description"className="form-control" onChange={this.handleChange}/>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.handleToggleModal}>Close</Button>{' '}
						<Button color="primary" type="submit">Save</Button>
					</ModalFooter>
					</form>
					</Modal>
				</Col>
			</Row>
     
			)
	}
}

const mapStateToProps = state => ({  
	client: state.client,
	board: state.board.boards.byId[state.board.current]
})

const connected = connect(mapStateToProps, { listCreate })(ListCreate)  

export default connected; 