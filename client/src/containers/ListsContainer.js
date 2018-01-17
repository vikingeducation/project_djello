import { connect } from "react-redux";
import serialize from "form-serialize";
import { userAll, userOne, listDelete, listShow, listCreate } from "../actions";
import ListsPanel from "../components/Lists/ListsPanel";
import { withRouter } from "react-router";

function mapStateToProps(state) {
  return {
    boards: state.demo.user.Boards,
    isFetching: state.demo.isFetching,
    results: state.demo.results,
    user: state.demo.user,
    users: state.demo.users,
    lists: state.demo.lists
  };
}

const mapDispatchToProps = dispatch => {
  return {
    listShow: id => {
      dispatch(listShow(id));
    },
    // onDeleteListClick: (listId, boardId) => {
    //   dispatch(listDelete(listId, boardId)); //e is the board's ID
    // }, //Create board is onSubmit
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      console.log(data);
      dispatch(listCreate(data));
      form.reset();
    }
  };
};

const ListsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListsPanel)
);

export default ListsContainer;
