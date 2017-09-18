import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import { createBoard, deleteBoard, createList, deleteList } from "../actions";

const mapStateToProps = state => {
	return {
		user: state.user,
		boards: state.boards
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createBoard: userId => {
			dispatch(createBoard(userId));
		},
		deleteBoard: id => {
			dispatch(deleteBoard(id));
		},
		createList: (boardId, boardIndex) => {
			dispatch(createList(boardId, boardIndex));
		},
		deleteList: id => {
			dispatch(deleteList(id));
		}
	};
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
	Dashboard
);

export default DashboardContainer;
