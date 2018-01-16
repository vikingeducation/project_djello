import { connect } from "react-redux";
import serialize from "form-serialize";
import { boardAll, boardDelete, boardUser } from "../actions";
import BoardsPanel from "../components/Board/BoardsPanel";
import { withRouter } from "react-router";

function mapStateToProps(state) {
  return {
    boards: state.demo.boards,
    isFetching: state.demo.isFetching,
    results: state.demo.results,
    user: state.demo.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getBoards: () => {
      dispatch(boardAll());
    },
    getUserBoards: () => {
      dispatch(boardUser());
    },
    onDeleteBoardClick: e => {
      dispatch(boardDelete(e)); //e is the board's ID
    }
  };
};

const BoardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardsPanel)
);

export default BoardContainer;
