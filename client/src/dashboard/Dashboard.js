import React from 'react';
import Dropdown from '../components/dropdown';

const Dashboard = (props) => {
	
	const { boards } = props;

	return (
		<div>
			<Dropdown boards={boards} />
		</div>
		)
}

export default Dashboard;