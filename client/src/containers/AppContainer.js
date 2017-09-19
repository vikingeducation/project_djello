import { connect } from "react-redux";
import App from "../components/App";
import { loginUser, returningUser, logoutUser } from "../actions";

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	loginUser: (email, password) => {
		dispatch(loginUser(email, password));
	},
	returningUser: () => {
		dispatch(returningUser());
	},
	logoutUser: () => {
		dispatch(logoutUser());
	}
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
