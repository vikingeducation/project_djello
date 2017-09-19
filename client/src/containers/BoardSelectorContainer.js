import React, {Component} from 'react';
//import { connect } from 'react-redux';
import BoardSelector from '../components/BoardSelector.js'
//import {getUser} from '../actions/userActions.js'


class BoardSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      user: null
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    console.log('fetching')
    fetch(`http://localhost:3001/api/v1/users/59c01244a6a1af102a96e835`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(json => {
      this.setState({user: json});
      console.log(this.state)
    })
    .catch(error => {
      console.error(error);
    });
  }


  render() { 
    if (!this.state.user) return null 
    return (
      <BoardSelector user={this.state.user} dropdownOpen={this.state.dropdownOpen} toggle={this.toggle}/>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {user: state.user,
//   dropdownOpen: state.dropdownOpen}
  
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUser: (id)=>{
//       dispatch(getUser(id))
//     }
//   }
// };

export default BoardSelectorContainer;

