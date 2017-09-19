import { connect } from "react-redux";
import List from "../components/List";
import { deleteList, editList, createCard } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		deleteList: id => {
			dispatch(deleteList(id));
		},
		createCard: (listId, listIndex) => {
			dispatch(createCard(listId, listIndex));
		},
		editList: (boardId, listId, field, data) => {
			dispatch(editList(boardId, listId, field, data));
		}
	};
};

const ListContainer = connect(null, mapDispatchToProps)(List);

export default ListContainer;
