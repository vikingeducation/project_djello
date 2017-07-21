import { connect } from "react-redux";
import CardModal from "../components/CardModal";
import serialize from "form-serialize";
import { getCurrentCard, addMemberToCurrentCard } from "../actions/currentCard";
import { editCard } from "../actions/lists";


const mapStateToProps = (state, ownProps) => {
  return {
    currentCard: state.currentCard.data,
    card: ownProps.card,
    isFetching: state.currentCard.isFetching,
    allUsers: state.allUsers.data
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
      dispatch(editCard(ownProps.token, ownProps.currentCard._id, data, ownProps.currentCard));
    }, 
    onUserAdd: e => {
      e.preventDefault();
      const form = e.target;
      const newMember = serialize(form, {hash: true}).newMember;
      console.log(newMember);
      dispatch(addMemberToCurrentCard(ownProps.token, ownProps.currentCard._id, newMember));
    }
  };
};

const CardModalContainer = connect(mapStateToProps, mapDispatchToProps)(CardModal);

export default CardModalContainer;
