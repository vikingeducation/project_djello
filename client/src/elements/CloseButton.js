import React from 'react'

const CloseButton = (props) => {

	const { handleDelete } = props;

	return (
		<button className="close" onClick={handleDelete} aria-label="Close" style={{outline: 'none'}}>
			<span aria-hidden="true">&times;</span>
		</button>
		)
}

export default CloseButton;