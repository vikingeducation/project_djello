import { connect } from "react-redux";
import Card from "../components/Card";
import serialize from "form-serialize";
import { editCard, deleteSelectedCard } from "../actions/lists";

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
    onDeleteCard: (e, cardId) => {
      if (
        window.confirm(
          `Are you sure you want to delete the following card? \n \n ${ownProps
            .card.title}`
        )
      ) {
        e.preventDefault();
        dispatch(deleteSelectedCard(ownProps.token, cardId));
      }
    }
  };
};

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);

export default CardContainer;
