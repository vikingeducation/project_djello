import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./index.css";
import AppContainer from "./containers/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { djelloApp } from "./reducers";

const store = createStore(djelloApp, applyMiddleware(thunk));

const app = () => (
	<MuiThemeProvider>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</MuiThemeProvider>
);

ReactDOM.render(app(), document.getElementById("root"));
registerServiceWorker();
