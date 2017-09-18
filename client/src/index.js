import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import store from "./store";

import App from "./components/App";
import "./styles/css/index.css";
import "sweetalert2/dist/sweetalert2.min.css";
import registerServiceWorker from "./registerServiceWorker";

render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
