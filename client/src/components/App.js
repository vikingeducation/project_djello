import React from 'react';
import '../App.css';
import Header from './Header.js'
import BoardSelectorContainer from '../containers/BoardSelectorContainer.js'
import {Route} from 'react-router'
import BoardContainer from '../containers/BoardContainer.js'
import Board from './Board.js'


const App = (props)=> {
  console.log(props)
    return (
      <div className="App" >
        <Header user={props.user}/>
        <BoardSelectorContainer user={props.user}/>
        <Route path="/boards/:board_id" render={()=><Board {...props}/>} />


      </div>
    );
}

export default App;
