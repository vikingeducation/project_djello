import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";

import { createBoard, getAllBoards, deleteBoard } from "../actions/board";
import NewBoardModal from "../Components/NewBoardModal";
import Showable from "../Components/elements/Showable";
import { Card, CardHeader, CardActions } from "material-ui/Card";
import Paper from "material-ui/Paper";
import styles from "../styles/style.css";
import boardIndexStyle from "../styles/boardIndexStyle.css";
import {
  colorPrimary0,
  colorSecondary0,
  colorThree4
} from "../styles/styles.js";
export const makeBoardShow = id => `/boards/${id}`;
const loadingScreen = <div>Loading...</div>;

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
    let boards;
    if (this.props.boards) {
      boards = this.props.boards.map(board => {
        const url = makeBoardShow(board._id);
        return (
          <Link to={url}>
            <Card
              style={{ flexGrow: 1, backgroundColor: colorPrimary0 }}
              className="boardCard"
              key={board._id}
            >
              <CardHeader title={board.title} titleColor={"white"} />
              <CardActions>
                <FlatButton
                  href={`${board._id}`} ///????????
                  mini={true}
                  onClick={e => {
                    this.onDeleteBoard(e, board._id);
                  }}
                  icon={<i className="material-icons">delete</i>}
                />
              </CardActions>
            </Card>
          </Link>
        );
      });
    }
    const newBoardButton = (
      <NewBoardModal onSubmit={this.onCreateBoard}>
        <FlatButton
          labelPosition="before"
          label="Create a Board"
          className="centerChildren"
          icon={<i className="material-icons">add</i>}
        />
      </NewBoardModal>
    );

    return (
      <Paper
        className="globalBoardIndex"
        style={{ backgroundColor: colorSecondary0 }}
      >
        <Showable
          isFetching={this.props.isFetching}
          loadingScreen={loadingScreen}
        >
          <h2>Boards</h2>
          <div className="cardWrapper">{boards}</div>
          <div>{newBoardButton}</div>
        </Showable>
      </Paper>
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
