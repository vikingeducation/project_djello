import React from "react";
import TextField from "material-ui/TextField";

const EditableDescription = ({ rows, text, editing, toggle }) => {
	return editing ? (
		<TextField
			multiLine={true}
			fullWidth={true}
			rows={rows}
			rowsMax={rows}
			onBlur={toggle}
			defaultValue={text}
		/>
	) : (
		<span onClick={toggle}>{text}</span>
	);
};

export default EditableDescription;
