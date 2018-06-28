import React, { Component } from 'react';
import { connect } from 'react-redux'
import { boardCreate } from './actions'
import { Button, Modal, ModalBody, ModalFooter } from 'mdbreact';

class CreateModal extends Component {

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

	handleCreate = (e) => {
		e.preventDefault();
		this.props.boardCreate(this.props.client, { title: this.state.name, description: this.state.description, userId: this.props.client.user._id });
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
					<Button color="info" onClick={this.handleToggleModal}>New Board</Button>
					<Modal isOpen={this.state.modal} toggle={this.handleToggleModal} className="cascading-modal">
						<div className="modal-header primary-color white-text">
							<h4 className="title">Create New Board</h4>
						</div>
						<ModalBody className="grey-text">
							<label htmlFor="boardName" className="grey-text font-weight-light">Board Name</label>
							<input type="text" id="boardName" name="name"className="form-control" value={this.state.name} onChange={this.handleChange}/>
							<br/>
							<label htmlFor="boardDescription" className="grey-text font-weight-light">Board Description</label>
							<input type="text" id="boardDescription" name="description"className="form-control" value={this.state.description} onChange={this.handleChange}/>
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={this.handleToggleModal}>Close</Button>{' '}
							<Button color="primary" onClick={this.handleCreate}>Save</Button>
						</ModalFooter>
					</Modal>
				</div>
		)
	}
}

const mapStateToProps = state => ({  
	client: state.client,
})

const connected = connect(mapStateToProps, { boardCreate })(CreateModal)  

export default connected; 