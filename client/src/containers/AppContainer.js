import * as Actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import serialize from "form-serialize";
import App from "../components/App/App";
import { userOne } from "../actions";

function mapStateToProps(state) {
  return {
    results: state.demo.results,
    user: state.demo.user,
    boards: state.demo.boards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    getId: () => {
      dispatch(userOne(1));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
