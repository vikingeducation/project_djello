import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FormInline, Input, Button } from 'mdbreact'

class UserDropdown extends Component {

	filterFriends = (friends, members) => {
		return friends.filter(friend => {
			return members.indexOf(friend) == -1 
		})
	}

	render() {

		const { user, members, selected, handleAddMember, handleSelectedMember } = this.props;

		if(user && members) {

			const filtered = this.filterFriends(user.friends, members);

			return (

			<FormInline className="my-3">
				<select onChange={handleSelectedMember} value={selected} className="form-control form-control-sm col-4 mr-2" id="friends">
				<option selected>Select User</option>
				{filtered.map(friend => {
					return <option key={friend} value={friend}>{friend}</option>
				})}
				</select>
				<Button size="sm" onClick={handleAddMember}>Add User</Button>
			</FormInline>
		)

		} else {
			return <p></p>
		}
	}
}

const mapStateToProps = state => ({  
	user: state.user
})

const connected = connect(mapStateToProps)(UserDropdown)  

export default connected;  
