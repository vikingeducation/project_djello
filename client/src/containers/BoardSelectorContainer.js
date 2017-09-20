import React, {Component} from 'react';
import BoardSelector from '../components/BoardSelector.js'

class BoardSelectorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  toggle=() => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() { 
    if (!this.props.user) return null 
    return (
      <BoardSelector user={this.props.user} dropdownOpen={this.state.dropdownOpen} toggle={this.toggle}/>
    );
  }
}

export default BoardSelectorContainer;

