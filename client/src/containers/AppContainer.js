import { connect } from "react-redux";
import App from "../components/App";
import { loginUser } from "../actions";

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	loginUser: (email, password) => {
		dispatch(loginUser(email, password));
	}
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
