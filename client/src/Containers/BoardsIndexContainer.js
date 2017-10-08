import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FloatingActionButton } from "material-ui";

import { createBoard, getAllBoards, deleteBoard } from "../actions/board";
import NewBoardModal from "../Components/NewBoardModal";
import Showable from "../Components/elements/Showable";
import Paper from "material-ui/Paper";

export const makeBoardShow = id => `/boards/${id}`;
const loadingScreen = <div>Loading...</div>;

const cardWrapper = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "100vh"
};

class BoardsIndexContainer extends React.Component {
  //hydrate some data
  componentDidMount = async () => {
    let data = await this.props.getAllBoards(this.props.user.username);
  };
  onCreateBoard = async name => {
    this.props.createBoard(name, this.props.user.username);
  };
  onDeleteBoard = async (e, id) => {
    //TODO: experiment with doing this with hrefs
    e.preventDefault();
    this.props.deleteBoard(id, this.props.username);
  };

  render() {
    console.log("board props = ", this.props);

    let boards;
    if (this.props.boards) {
      boards = this.props.boards.map(board => {
        const url = makeBoardShow(board._id);
        return (
          <Paper zDepth={1} key={board._id}>
            <Link to={url}>
              <h1>{board.title}</h1>
            </Link>
            <FloatingActionButton
              href={`${board._id}`} ///????????
              mini={true}
              onClick={e => {
                this.onDeleteBoard(e, board._id);
              }}
            >
              <i className="material-icons">delete</i>
            </FloatingActionButton>
          </Paper>
        );
      });
    }
    const newBoardButton = (
      <NewBoardModal onSubmit={this.onCreateBoard}>
        <FloatingActionButton>
          <i className="material-icons">add</i>
        </FloatingActionButton>
      </NewBoardModal>
    );

    return (
      <div>
        <Showable
          isFetching={this.props.isFetching}
          loadingScreen={loadingScreen}
        >
          <div style={cardWrapper}>
            {boards}
            {newBoardButton}
          </div>
        </Showable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.board,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createBoard: (name, userId) => {
      dispatch(createBoard(name, userId));
    },
    getAllBoards: userId => {
      dispatch(getAllBoards(userId));
    },
    deleteBoard: (boardId, userID) => {
      dispatch(deleteBoard(boardId, userID));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BoardsIndexContainer
);
