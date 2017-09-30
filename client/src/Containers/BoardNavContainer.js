import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

//MATERIAL UI COMPONENTS
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

//STYLES
import { activeLinkStyle, linkStyle } from "../styles/styles.js";

class BoardNavContainer extends React.Component {
  render() {
    let boardTitle = null;
    if (this.props.board) {
      boardTitle = <ToolbarTitle text={this.props.board.title} />;
    }
    const boardLinks = this.props.boards.map(board => {
      return (
        <MenuItem key={board._id} value={board._id}>
          <NavLink
            to={`/boards/${board._id}`}
            className="link"
            activeStyle={activeLinkStyle}
            style={linkStyle}
          >
            <span>{board.title}</span>
          </NavLink>
        </MenuItem>
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
  return {
    board: state.board.board,
    boards: state.board.boards
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardNavContainer);
