import App from "../components/App";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.app,
    boards: state.boards
  };
};

export default connect(mapStateToProps, null)(App);
