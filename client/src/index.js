import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { djelloApp } from "./reducers";

//const store = createStore(djelloApp, applyMiddleware(thunk));

//<MuiThemeProvider>
//		<Provider store={store}>
//			<App />
//		</Provider>
//	</MuiThemeProvider>

const app = () => (
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>
);

ReactDOM.render(app(), document.getElementById("root"));
registerServiceWorker();
