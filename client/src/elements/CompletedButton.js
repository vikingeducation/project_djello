import React from 'react'
import { Button } from 'mdbreact'

const CompletedButton = (props) => {

	const { completed, handleCompleted } = props

	let color = completed ? 'success' : 'danger';
	let text = completed ? 'Completed' : 'Uncompleted';

	return (
		<Button className="mr-0" onClick={handleCompleted} size="sm" value={completed} color={color}>{text}</Button>
	)
}

export default CompletedButton;