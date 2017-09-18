import { connect } from "react-redux";
import List from "../components/List";
import { deleteList, createCard } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		deleteList: id => {
			dispatch(deleteList(id));
		},
		createCard: (listId, listIndex) => {
			dispatch(createCard(listId, listIndex));
		}
	};
};

const ListContainer = connect(null, mapDispatchToProps)(List);

export default ListContainer;
