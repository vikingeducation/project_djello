import { connect } from "react-redux";
import Board from "../components/Board";
import serialize from "form-serialize";
import { editSpecificBoard } from "../actions/specificBoard";
import { createList } from "../actions/lists";

const mapStateToProps = state => {
  return {
    board: state.specificBoard.data,
    lists: state.lists.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeBoardTitle: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form);
      dispatch(
        editSpecificBoard(
          ownProps.token,
          ownProps.boardId,
          data,
          ownProps.userId
        )
      );
    },
    onCreateList: e => {
      e.preventDefault();
      dispatch(createList(ownProps.token, ownProps.boardId));
    }
  };
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;
