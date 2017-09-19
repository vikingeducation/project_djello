import { connect } from "react-redux";
import List from "../components/List";
import { deleteList, editList, createCard, editCard } from "../actions";

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
		},
		editCard: (boardId, listId, cardId, data) => {
			dispatch(editCard(boardId, listId, cardId, data));
		}
	};
};

const ListContainer = connect(null, mapDispatchToProps)(List);

export default ListContainer;
