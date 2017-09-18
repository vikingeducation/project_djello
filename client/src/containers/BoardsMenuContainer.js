import React from "react";
import BoardsMenu from "../components/BoardsMenu";
import { logUserOut, createBoard, selectBoard } from "../redux/users/actions";
import { connect } from "react-redux";

class BoardsMenuContainer extends React.Component {
  render() {
    const { user, logOut, createBoard, selectBoard } = this.props;
    return (
      <BoardsMenu
        user={user}
        selectBoard={selectBoard}
        createBoard={createBoard}
        logOut={logOut}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logUserOut());
    },
    createBoard: () => {
      dispatch(createBoard({ title: "new board", description: "yay" }));
    },
    selectBoard: id => () => {
      dispatch(selectBoard(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BoardsMenuContainer
);
