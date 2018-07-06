import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from '../list/ListContainer'
import ListCreate from '../list/ListCreate'
import Edit from '../elements/Edit'
import { Button } from 'mdbreact'

/**
  * @desc presentational board component.
  * @params board - board object.
  * @children ListContainers - containers mapped for each list id.
  */

const Board = (props) => {

  	const { 
  		board,
  		handleChange,
  		handleUpdate,
  		handleDelete,
  		handleEditTitle,
  		handleEditDescription,
  		showTitle,
  		showDescription,
  	} = props;

  	return (
  		<div>
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
		  				<h1 className="h1-responsive">{board.title}</h1>
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
			  		size="1.25rem"
			  		>
		  				<span className="lead">{board.description}</span>
		  			</Edit>
		  		</div>
	  		</div>
  			<hr className="my-2"/>
	  		<div className="row">
	  		{ board.lists.map(list => (
	  			<div key={list} className="col-3 my-3">
	  			<ListContainer listId={list} />
	  			</div>
	  			))}
	  		</div>
  			<hr className="my-3"/>
	  		<div className="row justify-content-end">
	  		<Button color="primary" onClick={handleUpdate}>Save</Button>
	  		<ListCreate />
	  		<Button color="danger" onClick={handleDelete}>Delete</Button>
	  		</div>
  		</div>
  		)
  }

  Board.propTypes = {
  	board: PropTypes.object,
  	handleChange: PropTypes.func,
  	handleUpdate: PropTypes.func,
  	handleDelete: PropTypes.func,
  	handleEditTitle: PropTypes.func,
  	handleEditDescription: PropTypes.func,
  	showTitle: PropTypes.bool,
  	showDescription: PropTypes.bool,
  }

  export default Board;