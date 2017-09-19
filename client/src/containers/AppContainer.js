import App from "../components/App";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps, null)(App);
