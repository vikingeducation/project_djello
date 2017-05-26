import React from "react";
import { connect } from "react-redux";
import { changeCurrentBoard } from "../actions/boards";
import DropDown from "../components/DropDown";

class DropDownContainer extends React.Component {
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
    return (
      <DropDown
        {...this.props}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards.data,
    currentBoard: state.boards.currentBoard
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeCurrentBoard: boards => e => {
      const board = boards.find(board => board.name === e.target.value);
      dispatch(changeCurrentBoard(board));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DropDownContainer);
