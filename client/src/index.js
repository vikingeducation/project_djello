import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginCheck from "./components/LoginCheck";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<LoginCheck />, document.getElementById("root"));
registerServiceWorker();
