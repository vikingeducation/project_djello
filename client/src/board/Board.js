import React from 'react';
import { Field } from 'redux-form'

import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'

const Board = (props) => {

	const { titleRequired, renderTitleInput, handleSubmit, invalid, submit, board: { requesting, errors, successful, messages } } = props;

	return (
		<div className="board">
			<div className="board-form">
				<form onSubmit={handleSubmit(submit)}>
					<h2>Create New Board</h2>
					<label htmlFor="title">Name</label>
					<Field
						name="title"
						type="text"
						id="title"
						className="title"
						component={renderTitleInput}
						validate={titleRequired}
					/>
					<button
						disabled={invalid}
						action="submit"
						>CREATE</button>
				</form>	
					<hr />
					<div className="widget-messages">
						{requesting && <span>Creating widget...</span>}
						{!requesting && !!errors.length && (
							<Errors message="Failure to create Widget due to:" errors={errors} />
							)}
						{!requesting && successful && !!messages.length && (
							<Messages messages={messages} />
							)}
					</div>
			</div>
		</div>
			)

}

export default Board