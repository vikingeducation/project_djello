import React from 'react';
import { Card, CardTitle, CardText, Button, Modal, ModalBody, ModalHeader, ModalFooter, CardHeader, ListGroupItem } from 'mdbreact';



const CardModal = (props) => {

	const { handleToggle, handleChange, handleUpdate, handleDelete, modal, handleEditTitle, handleEditDescription, card, list, showTitle, showDescription } = props;

	return (
			
			<Card className="my-2 px-2 py-2" border="light" onClick={handleToggle}>
				<CardText>
				{card.title}
				</CardText>
				<Modal isOpen={modal} toggle={handleToggle} size="lg">
					
				
					<form onSubmit={handleUpdate}>
						<ModalHeader onDoubleClick={handleEditTitle} color="primary-color">
							
							{showTitle ? <input style={{background: 'transparent', }} type="text" name="title" value={card.title} onChange={handleChange} /> : <p> {card.title} </p>}
							
						</ModalHeader>
			        	<ModalBody>
			        		<div className="row">
			        			<div className="col text-left">
			        				In List: {list.title}
			        			</div>
			        			<div className="col text-right">
			        				<Button size="sm" color="success">Mark Completed</Button>
			        			</div>
			        		</div>
			            	<hr className="my-3"/>
			            	<div onDoubleClick={handleEditDescription}>
								
								{showDescription ? <input style={{background: 'transparent' }} type="text" name="description" value={card.description} onChange={handleChange} /> : <p>{card.description}</p>}
			            	
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
							<Button className="btn btn-indigo" type="submit">Save</Button>
			            	<Button color="danger" onClick={handleDelete}>Delete</Button>
			            	</div>
			           
				        </ModalBody>
				        </form>
				</Modal>
				</Card>
		
		)
}

export default CardModal;