import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import { dataRequest } from './actions';
import { setClient } from '../client/actions';
import Dropdown from '../components/dropdown';

import BoardContainer from '../board/BoardContainer';
import CardContainer from '../card/CardContainer';

class DashboardContainer extends Component {

	constructor(props){
		super(props);
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

	render() {

		const { boards } = this.props;

		return (
			<Container>
				<Dropdown />
				<BoardContainer />
			</Container>
		)
	}

}


const getBoards = (state) => {
	return state.board.boards.allIds.map(id => {
		return state.board.boards.byId[id];
	})
}


const mapStateToProps = state => ({  
  client: state.client,
  boards: getBoards(state)
})

// Make the Client and Board available in the props as well
// as the boardCreate() function
const connected = connect(mapStateToProps, { dataRequest, setClient })(DashboardContainer)  

export default connected;  
