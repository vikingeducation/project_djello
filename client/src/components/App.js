import React, { Component } from 'react';
import Header from './Header';
import AuthLayerContainer from '../containers/AuthLayerContainer';

// So we have an Auth Container
// in it there's a boolean check
// if isAuthenticated, return boards
// else, return login form
// also create an app container that passes in isAuthenticated to
// header for logout purposes

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Djello" />
         <AuthLayerContainer /> 
      </div>
    );
  }
}

export default App;
