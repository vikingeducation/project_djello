import { connect } from "react-redux";
import CardModal from "../components/CardModal";
// import serialize from "form-serialize";
import { getCurrentCard } from "../actions/currentCard";

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
    }
  };
};

const CardModalContainer = connect(mapStateToProps, mapDispatchToProps)(CardModal);

export default CardModalContainer;
