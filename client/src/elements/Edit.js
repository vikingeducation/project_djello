import React from 'react';

function makeStyles(size, margin, padding, width, textAlign) {

	const obj = {};

	if(size)
		obj.fontSize = size
	if(margin)
		obj.margin = margin
	if(padding)
		obj.padding = padding
	if(width)
		obj.width = width
	if(textAlign)
		obj.textAlign = textAlign

	return obj;
}


const Edit = (props) => {

	const { edit, name, value, handleChange, handleEdit, size, margin, padding, width, textAlign, inputClass } = props;

	let styles = makeStyles(size, margin, padding, width, textAlign);

	const className = `form-control ${inputClass ? inputClass : ""}`

	if(edit) {
		return <input className={className} style={styles} type="text" name={name} value={value}  onDoubleClick={handleEdit} onChange={handleChange} />
	}
	return <div onDoubleClick={handleEdit}>{props.children}</div>
}

export default Edit;