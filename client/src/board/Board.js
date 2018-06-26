import React from 'react';
import ListContainer from '../list/ListContainer'
import { Button } from 'mdbreact'
import Edit from '../elements/Edit'
import ListCreate from '../list/ListCreate'

const Board = (props) => {

	const { board, showTitle, handleUpdate, showDescription, handleChange, handleDelete, handleEditTitle, handleEditDescription } = props;

	return (
		<div>
			<form onSubmit={handleUpdate}>
				<div className="row">
					<div className="col text-left my-1">
						<Edit 
							name="title"
							edit={showTitle}
							value={board.title}
							handleEdit={handleEditTitle}
							handleChange={handleChange}
							size="2.5rem"
						>
							<h1>{board.title}</h1>
						</Edit>
					</div>
				</div>
				<div className="row">
					<div className="col text-left my-1">
						<Edit 
							name="description"
							edit={showDescription}
							value={board.description}
							handleEdit={handleEditDescription}
							handleChange={handleChange}
							size="1rem"
						>
							<span>{board.description}</span>
						</Edit>
					</div>
				</div>
				<hr className="my-2"/>
			<div className="row">
			{ board.lists.map(list => (
				<div key={list} className="col-4 my-3">
					<ListContainer listId={list} />
				</div>
			))}
			</div>
			<div className="row justify-content-end">
				<button className="btn btn-indigo" type="submit">Save</button>
				<button className="btn btn-indigo" onClick={handleDelete}>Delete</button>
				<ListCreate />
			</div>
			</form>
		</div>
	)
}

export default Board;