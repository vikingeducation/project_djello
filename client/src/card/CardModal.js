import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Card, CardHeader, CardFooter, CardImage, CardBody, CardTitle, CardText } from 'mdbreact';


const editField = (props) => {

	return (

		<div>

		</div>

	)


}



const CardModal = (props) => {

	const { handleToggle, handleChange, invalid, modal, handleSubmit, handleEditTitle, card, list, showTitle } = props;

	return (
			<Container>
			<Button color="danger" onClick={handleToggle}>Modal</Button>
				<Modal isOpen={modal} toggle={handleToggle} size="lg">
					<form onSubmit={handleSubmit}>
					<Card>
						<CardHeader onDoubleClick={handleEditTitle} color="primary-color">
							
							{showTitle ? <input style={{background: 'transparent', }} type="text" name="title" value={card.title} onChange={handleChange} /> : <p> {card.title} </p>}

						</CardHeader>
			        	<CardBody>
			        		<div className="row">
			        			<div className="col text-left">
			        				In List: {list.title}
			        			</div>
			        			<div className="col text-right">
			        				<Button size="sm" color="success">Mark Completed</Button>
			        			</div>
			        		</div>
			            	<hr className="my-3"/>
			            	<div>
								<p>{card.description}</p>
								<input style={{background: 'transparent', }} type="text" name="description" value={card.description} onChange={handleChange} />
			            	</div>
			            	<hr className="my-3"/>
			            	<div>
			            		<p>Members</p>
			            		<div className="row">
			            			<div className="col text-left">
			            			Name 
			            			</div>
			   						<div className="col text-right">
			   						remove
			            			</div>
			            		</div>
			            	</div>
			            	<hr className="my-3"/>
			            	<div>
			          			<p>Activity</p>
			            	</div>
			            	<hr className="my-3"/>
			       			<div className="mx-auto" style={{textAlign: 'center'}}>
			            	<button 
							disabled={invalid}
							action="submit"
								>Update</button>
			            	<Button color="danger">Delete</Button>
			            	</div>
			           
				        </CardBody>
			    	</Card>
			    	</form>
				</Modal>
			</Container>
		)
}

export default CardModal;