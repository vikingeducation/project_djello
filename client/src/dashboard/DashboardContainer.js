import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'

import { dataRequest } from './actions';
import { setClient } from '../client/actions';
import Dropdown from '../components/dropdown';

import BoardContainer from '../board/BoardContainer';
import CardContainer from '../card/CardContainer';

class DashboardContainer extends Component {

	constructor(){
		super();
		this.state = {
			boards: [],
		}
	}

	componentDidMount() {
		this.props.dataRequest({
			user: {
				_id: 'HyFxJ4eW7'
			}
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.boards !== this.props.boards) {
			
			const updated = this.props.boards.allIds.map(id => {
				return this.props.boards.byId[id];
			})

			this.setState({
				boards: updated,
			})
		}
	}



	render() {

		const { boards } = this.state;

		return (
			<div>
				<Dropdown />
				<BoardContainer />
			</div>
		)
	}

}

const mapStateToProps = state => ({  
  client: state.client,
  boards: state.board.boards,
})

// Make the Client and Board available in the props as well
// as the boardCreate() function
const connected = connect(mapStateToProps, { dataRequest, setClient })(DashboardContainer)  

export default connected;  
