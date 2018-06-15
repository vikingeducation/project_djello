import React from 'react';

const Dropdown = (props) => {

	const { boards } = props;

	return (
		<div className="dropdown">
			<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			Boards
			</button>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
				{boards.map(board => {
					return (
						<a className="dropdown-item" key={board._id}>{board.title}</a>
						)
				})}	
			</div>
		</div>
		)
}

export default Dropdown;