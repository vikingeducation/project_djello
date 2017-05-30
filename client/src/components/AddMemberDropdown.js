import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class AddMemberDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { users, members } = this.props;
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Add Member
        </DropdownToggle>
        <DropdownMenu>
          {dropMembers({ users, members })}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

const dropMembers = ({ users, members }) => {
  return users.filter(user => !members.includes(user)).map(user => {
    return (
      <DropdownItem key={user} value={user}>
        {user}
      </DropdownItem>
    );
  });
};
