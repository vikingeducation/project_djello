import React from 'react'
import CardModalContainer from '../card/CardModalContainer'
import CardCreate from '../card/CardCreate'
import Edit from '../elements/Edit'
import { Button } from 'mdbreact'


import { Card, CardText, CardHeader, CardBody, ListGroup } from 'mdbreact'

const List = (props) => {

	const { list, handleDelete, handleEditTitle, handleEditDescription, handleUpdate, handleChange, showTitle, showDescription } = props;

	return (
		<Card>
		<Edit 
			name="title"
			edit={showTitle}
			value={list.title}
			handleEdit={handleEditTitle}
			handleChange={handleChange}
			textAlign="center"
			size="1rem"
			width="inherit"
			padding="0.25rem .75rem"
			margin=".5rem"
		>
			<CardHeader className="text-center">{list.title}</CardHeader>
		</Edit>
		<CardBody>
			<Edit 
				name="description"
				edit={showDescription}
				value={list.description}
				handleEdit={handleEditDescription}
				handleChange={handleChange}
				size="1rem"
			>
			<CardText>{list.description}</CardText>
			</Edit>
			{ list.cards.map(card => (

				<CardModalContainer key={card} cardId={card} listId={list._id}/>

			))}
			<div className="row">
				<Button className="col" size="sm" onClick={handleUpdate}>Save</Button>
				<CardCreate list={list} />
				<Button className="col" size="sm" color="danger" onClick={handleDelete}>Delete</Button>
			</div>
			</CardBody>
		</Card>
	)
}

export default List;