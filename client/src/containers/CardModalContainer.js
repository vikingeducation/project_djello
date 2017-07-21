import { connect } from "react-redux";
import CardModal from "../components/CardModal";
import serialize from "form-serialize";
import { getCurrentCard } from "../actions/currentCard";
import { editCard } from "../actions/lists";


const mapStateToProps = (state, ownProps) => {
  return {
    currentCard: state.currentCard.data,
    card: ownProps.card,
    isFetching: state.currentCard.isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetCard: cardId => {
      dispatch(getCurrentCard(ownProps.token, cardId));
    },
    onUpdateCard: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form);
      dispatch(editCard(ownProps.token, ownProps.currentCard._id, data));
    }, 
  };
};

const CardModalContainer = connect(mapStateToProps, mapDispatchToProps)(CardModal);

export default CardModalContainer;
