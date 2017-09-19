import { connect } from "react-redux";
import List from "../components/List";
import {
	deleteList,
	editList,
	createCard,
	editCard,
	completeCard
} from "../actions";

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
		},
		completeCard: id => {
			dispatch(completeCard(id));
		}
	};
};

const ListContainer = connect(null, mapDispatchToProps)(List);

export default ListContainer;
