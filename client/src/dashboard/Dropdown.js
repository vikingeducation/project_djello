import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const CustomDropdown = (props) => {

	const { dropdownOpen, handleToggleDropdown, setCurrentBoard, boards } = props;

	return (
		<Dropdown isOpen={dropdownOpen} toggle={handleToggleDropdown}>
			<DropdownToggle caret>
				Board List
			</DropdownToggle>
			<DropdownMenu>
				{ boards.map(board => (
					<DropdownItem key={board._id} onClick={() => setCurrentBoard(board)}>{ board.title }</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>

		)
}

export default CustomDropdown;