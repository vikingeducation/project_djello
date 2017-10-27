import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import NewIcon from 'material-ui/svg-icons/content/add';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';

export default props => {
	let buttonIcon;
	switch (props.icon) {
		case 'new':
			buttonIcon = <NewIcon />;
			break;
		case 'edit':
			buttonIcon = <EditIcon />;
			break;
		case 'delete':
			buttonIcon = <DeleteIcon />;
			break;
	}
	return (
		<div className="board-actions">
			{props.items.map(item =>
				<RaisedButton
					onClick={item.onClick}
					label={item.label}
					primary={props.primary ? true : false}
					secondary={props.secondary ? true : false}
					icon={buttonIcon}
				/>
			)}
		</div>
	);
};
