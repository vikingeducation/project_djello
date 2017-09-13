import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/css/index.css";
import "sweetalert2/dist/sweetalert2.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
