import React from "react";
import TextField from "material-ui/TextField";

const EditableTitle = ({ title, editing }) => {
	return editing ? <TextField defaultValue={title} /> : <span>{title}</span>;
};

export default EditableTitle;
