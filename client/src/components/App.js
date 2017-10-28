import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import SiteHeader from "./SiteHeader";
import LoginContainer from "../containers/LoginContainer";

const App = () => (
  <Router>
    <div>
      <SiteHeader />
      <Container>
        <Route path="/" component={LoginContainer} />
      </Container>
    </div>
  </Router>
);

export default App;
