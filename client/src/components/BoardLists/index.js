import React, { Component } from 'react';

import BoardList from './list-interface';

export default class BoardLists extends Component {
	render() {
		if (!this.props.board.lists) return null;
		return (
			<div className="pure-g">
				{this.props.board.lists.map(list =>
					<BoardList
						key={list.name}
						avatar={this.props.user.avatar}
						{...list}
					/>
				)}
			</div>
		);
	}
}
