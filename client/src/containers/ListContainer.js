import { connect } from "react-redux";
import List from "../components/List";
import serialize from "form-serialize";
import { editList, deleteSelectedList, createCard } from "../actions/lists";

const mapStateToProps = (state, ownProps) => {
  return {
    list: ownProps.list,
    token: ownProps.token,
    isFetching: state.lists.isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateList: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form);
      dispatch(editList(ownProps.token, ownProps.list._id, data));
    },
    onDeleteList: (e, listId) => {
      if (
        window.confirm(
          `Are you sure you want to delete the following list? \n \n ${ownProps
            .list.title}`
        )
      ) {
        e.preventDefault();
        dispatch(deleteSelectedList(ownProps.token, listId));
      }
    },
    onCreateCard: (e, listId) => {
      e.preventDefault();
      dispatch(createCard(ownProps.token, listId));
    }
  };
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListContainer;
