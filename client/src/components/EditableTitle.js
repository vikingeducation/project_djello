import React from "react";
import TextField from "material-ui/TextField";

const EditableTitle = ({ title, editing, toggle }) => {
	return editing ? (
		<TextField onBlur={toggle} defaultValue={title} />
	) : (
		<span onClick={toggle}>{title}</span>
	);
};

export default EditableTitle;
