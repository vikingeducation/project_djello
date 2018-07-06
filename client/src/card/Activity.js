import React from 'react';
import Entry from './Entry';

const Activity = (props) => {

	const { log } = props;

	if(log) {
		return (
			<table className="table">
				<thead>
					<tr>
						<th className="w-25">Timestamp</th>
						<th className="w-20">Username</th>
						<th className="w-55">Changes Made</th>
					</tr>
				</thead>
			<tbody>
				{log.map(entry => (
					<Entry key={entry.timestamp} entry={entry} />
				))}
			</tbody>
			</table>
		)

	} else
		return null
}

export default Activity;