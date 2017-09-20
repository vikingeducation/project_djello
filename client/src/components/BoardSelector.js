import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';

const BoardSelector = (props) => {
  let availableBoards = props.user.boards.map(board=>{
    let linkUrl = '/boards/' + board._id;
    return (
    <DropdownItem key={board._id}>
      <Link to={linkUrl}>
        {board.title}
      </Link>
    </DropdownItem>
    )
  })

    return (
      <Dropdown isOpen={props.dropdownOpen} toggle={props.toggle}>
        <DropdownToggle caret>
          Select a Board
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Your Boards</DropdownItem>
          {availableBoards}
        </DropdownMenu>
      </Dropdown>
    );
  }

export default BoardSelector;