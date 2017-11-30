import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../actions";
import Button from "./elements/Button";

class EditableMembers extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false, formUsers: this.props.currentValue };
    this.onClick = this.onClick.bind(this);

    this.clickToHide = this.clickToHide.bind(this);
    this.saveMembers = this.saveMembers.bind(this);
    this.preventing = this.preventing.bind(this);
    this.addUsers = this.addUsers.bind(this);
  }

  onClick() {
    console.log("SHOW");
    this.setState({
      show: !this.state.show
    });
  }
  clickToHide(e) {
    console.log("hide????");
    if (this.state.show) {
      this.setState({ show: false });
    }
  }

  saveMembers(event) {
    this.props.changeValue(
      this.props.currentValue,
      this.state.formUsers,
      this.props.addtionalParmas
    );
    this.props.setCurrentValue(null, this.props.indexCurrentValue);
    this.setState({ show: false });
  }

  preventing(event) {
    event.stopPropagation();
  }

  addUsers = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      formUsers: [...this.state.formUsers, e.target.value]
    });
  };

  removeUsers = e => {
    e.preventDefault();
    let newFormUsers = this.state.formUsers.filter(user => {
      if (user !== e.target.value) {
        return user;
      }
      return null;
    });
    this.setState({
      ...this.state,
      formUsers: newFormUsers
    });
  };
  componentWillMount() {
    this.props.getAllUsers();
  }

  render() {
    let usersToRender = <div />;
    if (!this.props.isFetching) {
      usersToRender = this.props.users.map(user => {
        if (this.state.formUsers.indexOf(user.username) >= 0) {
          return (
            <Button
              color="success"
              value={user.username}
              name="members"
              key={user.username}
              onClick={this.removeUsers}
            >
              {user.username}
            </Button>
          );
        }
        return (
          <Button
            color="default"
            value={user.username}
            name="members"
            key={user.username}
            onClick={this.addUsers}
          >
            {user.username}
          </Button>
        );
      });
    }
    let display = (
      <p onClick={this.onClick}>{this.props.currentValue.join(", ")}</p>
    );
    if (this.state.show) {
      display = (
        <div onClick={this.preventing}>
          <div>{usersToRender}</div>
          <button onClick={this.saveMembers}>Save</button>
          <button onClick={this.clickToHide}>Cancel</button>
        </div>
      );
    }
    return <div>{display}</div>;
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(getUsers());
    }
  };
};

EditableMembers.propTypes = {
  currentValue: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  setCurrentValue: PropTypes.func.isRequired,
  addtionalParmas: PropTypes.node,
  indexCurrentValue: PropTypes.node
};
//<EditableField currentValue={string} changeValue={func} setCurrentValue={func} />
export default connect(mapStateToProps, mapDispatchToProps)(EditableMembers);
