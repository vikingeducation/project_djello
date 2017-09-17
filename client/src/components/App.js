import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import SiteHeader from "./SiteHeader";
import LoginContainer from "../containers/LoginContainer";
import BoardContainer from "../containers/BoardContainer";

const App = () => (
  <Router>
    <div>
      <SiteHeader />
      <Container>
        <Switch>
          <Redirect exact from="/" to="/boards" />
          <Route exact path="/login" component={LoginContainer} />
          <Route path="/boards/:id?" component={BoardContainer} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
