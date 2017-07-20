import { connect } from "react-redux";
import Card from "../components/Card";
import serialize from "form-serialize";
import { editCard } from "../actions/lists";

const mapStateToProps = (state, ownProps) => {
  return {
    card: ownProps.card
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateCard: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form);
      dispatch(editCard(ownProps.token, ownProps.card._id, data));
    },
    // onDeleteCard: (e, listId) => {
    //   if (window.confirm(
    //     `Are you sure you want to delete the following list? \n \n ${ownProps.list.title}`
    //   )) {
    //     e.preventDefault();
    //     dispatch(deleteSelectedCard(ownProps.token, listId));
    //   }
    // }
  };
};

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);

export default CardContainer;
