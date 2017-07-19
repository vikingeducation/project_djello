import { connect } from "react-redux";
import Board from "../components/Board";
// import { loginUser } from "../actions/auth";

const mapStateToProps = state => {
  return {
    board: state.specificBoard.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeBoardTitle: e => {
    }
  }
}

const BoardContainer = connect(mapStateToProps, null)(Board);

export default BoardContainer;