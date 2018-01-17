import { connect } from "react-redux";
import serialize from "form-serialize";
import { userAll, userOne, cardDelete, cardCreate } from "../actions";
import CardPanel from "../components/Card/CardPanel";
import { withRouter } from "react-router";

function mapStateToProps(state) {
  return {
    boards: state.demo.user.Boards,
    isFetching: state.demo.isFetching,
    results: state.demo.results,
    user: state.demo.user,
    users: state.demo.users,
    lists: state.demo.lists,
    cards: state.demo.cards
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // cardShow: id => {
    //   dispatch(cardShow(id));
    // },
    // onDeleteListClick: (listId, boardId) => {
    //   dispatch(cardDelete(listId, boardId)); //e is the board's ID
    // }, //Create board is onSubmit
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      console.log(data);
      dispatch(cardCreate(data));
      form.reset();
    }
  };
};

const CardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CardPanel)
);

export default CardContainer;
