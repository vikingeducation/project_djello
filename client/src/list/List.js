import React from 'react'
import CardModalContainer from '../card/CardModalContainer'
import CardCreate from '../card/CardCreate'
import Edit from '../elements/Edit'
import CloseButton from '../elements/CloseButton'
import { Button } from 'mdbreact'


import { Card, CardText, CardHeader, CardBody, CardFooter, ListGroup } from 'mdbreact'

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
			<CardHeader className="text-center">
				<CloseButton
					handleDelete={handleDelete}
				/>
				{list.title}
			</CardHeader>
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
			</CardBody>
			<CardFooter>
				<div className="row">
				<div className="col pr-1">
					<Button block size="sm" onClick={handleUpdate}>Save</Button>
				</div>
				<div className="col pl-1">
					<CardCreate />
				</div>
			</div>
			</CardFooter>
		</Card>
	)
}

export default List;