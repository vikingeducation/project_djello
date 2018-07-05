import React from 'react';
import moment from 'moment';

function parseType(text) {
	let type = text.split(':')[0];
	switch(type) {
		case "title":
			return "Title Update"
		case "description":
			return "Description Update"
		case "completed":
			return "Status Update"
		case "removed":
			return "Members Removed"
		case "added":
			return "Members Added"
		default:
			return
	}
}

function parseDescription(text) {
	let type = text.split(':')[0];
	let description = text.split(':')[1].split(',');

	if(type == "completed") {
		return description.map(i => {
			return i == 'true' ? 'Completed' : 'Uncompleted';
		}).join(' to ');
	}

	if(type !== "added" && type !== "removed") {
		return description.join(' to ');
	} else
		return description.join(', ');
}

function parseDate(dateString) {
	let t = new moment(dateString);
	return t.format("dd.mm.yyyy hh:MM:ss");

}

const Entry = (props) => {

	const { entry } = props

	if(entry) { 
		return (
			<tr>
				<td className="small">{entry.timestamp}</td>
				<td className="small">{entry.user}</td>
				<td className="small">

					{entry.log.map(change => (
						<dl key={change} className="row my-0">
							<dd className="col-sm-4">{parseType(change)}</dd>
							<dd className="col-sm-8">{parseDescription(change)}</dd>
						</dl>
					))}
				
				</td>
			</tr>
		)
		
	} else
		return null

}

export default Entry;