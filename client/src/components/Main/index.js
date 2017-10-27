import React, { Component } from 'react';
import Events from '../../socket/events';
import {
	successGetBoard,
	failureGetBoard
} from '../../containers/Main/actions';
import store from '../../store';

import ReactLoading from 'react-loading';
import Paper from 'material-ui/Paper';
import DjelloAppBar from '../DjelloAppBar';
import BoardActions from '../BoardActions';
import BoardSelection from '../BoardSelection';
import BoardLists from '../../containers/BoardLists';

const { INTERNAL } = Events;
const newActionItems = [
	{
		label: 'New Board',
		icon: 'new'
	}
];
const editDeleteActionItems = [
	{
		label: 'Edit Board',
		icon: 'edit',
		secondary: true
	},
	{
		label: 'Delete Board',
		icon: 'delete',
		secondary: true
	}
];
export default class Main extends Component {
	constructor(props) {
		super(props);

		if (!props.socket) {
			throw new Error('No socket supplied for main component');
		}
		this.socket = props.socket;

		this.socket.on(INTERNAL.GET_BOARD_SUCCESS, data => {
			store.dispatch(successGetBoard(data));
		});

		this.socket.on(INTERNAL.GET_BOARD_FAILURE, err => {
			store.dispatch(failureGetBoard(err));
		});
	}

	componentDidMount() {
		this.props.getBoards({
			socket: this.socket,
			options: {
				user: {
					_id: this.props.user._id
				}
			},
			populate: {
				path: 'lists',
				populate: {
					path: 'cards'
				}
			}
		});
	}

	render() {
		return (
			<div>
				<DjelloAppBar title="Djello - The project management toolkit for awesome people!" />

				<div className="pure-g">
					<div className="pure-u-3-4">
						<div className="pure-u-3-4">
							<BoardSelection />
						</div>
						<div className="pure-u-1-4">
							<BoardActions items={editDeleteActionItems} />
						</div>
					</div>
					<div className="pure-u-1-4">
						<BoardActions items={newActionItems} />
					</div>

					<Paper zDepth={1} className="pure-u-3-4">
						<BoardLists
							user={this.props.user}
							board={this.props.currentBoard || []}
						/>
					</Paper>
					<Paper zDepth={1} className="pure-u-1-4">
						Userlist here?<br />
						Activity Log here?<br />
						Something else cool here?<br />
					</Paper>
				</div>
			</div>
		);
	}
}
