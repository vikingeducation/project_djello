import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FormInline, Input, Button } from 'mdbreact'


const AddMember = (props) => {

		const { list, selected, handleChange, handleSubmit } = this.props;

		if(list) {

			return (

			<FormInline className="my-3">
				<select onChange={handleSelectedMember} value={selected} className="form-control form-control-sm col-4 mr-2" id="selectUser">
				{list.map(user => {
					return <option key={user} value={user}>{user}</option>
				})}
				</select>
				<Button size="sm" onClick={handleSubmit}>Add User</Button>
			</FormInline>
		)

		} else {
			return null
		}
}


export default AddMember;