import React from 'react'
import { ListGroupItem, ListGroup } from 'mdbreact'
import CloseButton from '../elements/CloseButton'

const MemberList = (props) => {

	const { members, handleDeleteMember } = props

	if(members.length > 0) {

		return (
			<ListGroup>
			{ members.map(member => {
				return (
					<ListGroupItem key={ member }>{ member }
						<CloseButton handleDelete={() => handleDeleteMember(member)} />
					</ListGroupItem>
				)
			})}
			</ListGroup>
			)
	}
	return null
}

export default MemberList;