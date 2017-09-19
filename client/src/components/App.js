import React, { Component } from 'react';
import '../App.css';
import Header from './Header.js'
import BoardSelectorContainer from '../containers/BoardSelectorContainer.js'


class App extends Component {



  render() {
    return (
      <div className="App" >
        <Header />
        <BoardSelectorContainer />


      </div>
    );
  }
}

export default App;
