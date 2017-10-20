import { connect } from "react-redux";
import Card from "../components/Card";
import { deleteCard } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		deleteCard: id => {
			dispatch(deleteCard(id));
		}
	};
};

const CardContainer = connect(null, mapDispatchToProps)(Card);

export default CardContainer;
