import React from "react";
import { connect } from "react-redux";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router-dom";
import IconButton from "material-ui/IconButton";

class BoardNavContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    let boardTitle = null;
    if (this.props.board) {
      boardTitle = <ToolbarTitle text={this.props.board.title} />;
    }
    const boardLinks = this.props.boards.map(board => {
      return (
        <Link key={board._id} to={`${board._id}`}>
          <MenuItem value={board._id} primaryText={board.title} />
        </Link>
      );
    });

    return (
      <Toolbar>
        {/* user avatar here */}
        <ToolbarGroup>{boardTitle}</ToolbarGroup>
        <ToolbarGroup>
          <DropDownMenu iconButton={<i className="material-icons">menu</i>}>
            {boardLinks}
          </DropDownMenu>
          <IconButton tooltip="settings" tooltipPosition="bottom-center">
            <i className="material-icons">settings</i>
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const mapStateToProps = state => {
  console.log("state of lists, = ", state);
  return {
    board: state.board.board,
    boards: state.board.boards
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardNavContainer);
