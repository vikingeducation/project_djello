import React, {Component} from 'react';
//import { connect } from 'react-redux';
import Board from '../components/Board.js'

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null
    };
  }

  render() { 
    if (!this.props.user) return null 
    return (
      <Board id={this.props.match.params.board_id} user={this.props.user} />
    );
  }
}

export default BoardContainer;