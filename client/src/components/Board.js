import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DjelloCard from './DjelloCard.js'
import {withRouter} from 'react-router'

const Board = (props) => {
  console.log(props)
  if (!props.user) return null
  return (
  <div>
    <DjelloCard card={props.user.boards[0].lists[0].cards[0]} />
  </div>
)
}

export default withRouter(Board);