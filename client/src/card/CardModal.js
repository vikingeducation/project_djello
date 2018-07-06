import React from 'react';
import Edit from '../elements/Edit';
import CompletedButton from '../elements/CompletedButton';
import MemberList from './MemberList';
import Activity from './Activity';
import UserDropdown from '../user/UserDropdown'
import { Card, CardText, Button, Modal, ModalBody, CardHeader, CardFooter, CardBody, ModalHeader, ModalFooter, ListGroup, ListGroupItem } from 'mdbreact';

const CardModal = (props) => {

	const { handleToggle, selectedMember, handleChange, handleCompleted, handleUpdate, handleDelete, handleAddMember, handleSelectedMember, handleDeleteMember, modal, handleEditTitle, handleEditDescription, card, list, showTitle, showDescription } = props;

	return (
		<Card className="my-2 px-2 py-2" border="light" onClick={handleToggle}>
			<CardText>
				{card.title}
			</CardText>
			<Modal isOpen={modal} toggle={handleToggle} size="lg">
				<CardHeader className="p-3" onDoubleClick={handleEditTitle} color="primary-color">
					<Edit 
						name="title"
						edit={showTitle}
						value={card.title}
						handleEdit={handleEditTitle}
						handleChange={handleChange}
						size="1.75rem"
						>
						<h3>{card.title}</h3>
					</Edit>
				</CardHeader>
				<CardBody>
					
					<div className="d-flex justify-content-between">
						<p className="my-auto"><span className="font-weight-bold">List</span>: {list.title}</p>
						
						<CompletedButton completed={card.completed} handleCompleted={handleCompleted}/>
					</div>
			
					<hr className="my-3"/>
					<p className="font-weight-bold">Description</p>
						<Edit 
							name="description"
							edit={showDescription}
							value={card.description}
							handleEdit={handleEditDescription}
							handleChange={handleChange}
							size="1rem"
						>
							<p>{card.description}</p>
						</Edit>
					<hr className="my-3"/>
					<div>
						<p className="font-weight-bold">Members</p>
						{props.memberlist}
						{props.userdropdown}
					</div>
					<hr className="my-3"/>
					<div>
						{props.activity}
					</div>
					
				</CardBody>
				<CardFooter>
					<div className="mx-auto" style={{textAlign: 'center'}}>
						<Button className="btn btn-indigo" onClick={handleUpdate}>Save</Button>
						<Button className="btn btn-indigo" onClick={handleDelete}>Delete</Button>
					</div>
				</CardFooter>
			</Modal>
		</Card>
		)
}

export default CardModal;