import { connect } from "react-redux";
import serialize from "form-serialize";
import { userAll, boardDelete, userOne, boardCreate } from "../actions";
import BoardsPanel from "../components/Board/BoardsPanel";
import { withRouter } from "react-router";

function mapStateToProps(state) {
  return {
    boards: state.demo.user.Boards,
    isFetching: state.demo.isFetching,
    results: state.demo.results,
    user: state.demo.user,
    users: state.demo.users
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getBoards: () => {
      dispatch(userAll());
    },
    userOne: id => {
      dispatch(userOne(id));
    },
    onDeleteBoardClick: (boardId, userId) => {
      dispatch(boardDelete(boardId, userId)); //e is the board's ID
    }, //Create board is onSubmit
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(boardCreate(data));
      form.reset();
    }
  };
};

const BoardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardsPanel)
);

export default BoardContainer;
