import React, { PureComponent } from 'react';

import Paper from 'material-ui/Paper';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { cyan100, blue300, grey50 } from 'material-ui/styles/colors';

import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Close from 'material-ui/svg-icons/navigation/close';

import Divider from 'material-ui/Divider';

const InlineEditLink = props => {
	return (
		<a
			title="Edit this..."
			className="list-info-edit-link"
			onClick={props.onClick}
		>
			{props.text}
		</a>
	);
};

const FloatingCloseButton = ({ onClick }) => {
	return (
		<FloatingActionButton
			className="delete-board-button"
			mini={true}
			secondary={true}
			iconStyle={{
				color: 'rgb(255, 255, 255)'
			}}
			onClick={onClick}
		>
			<Close />
		</FloatingActionButton>
	);
};

class BoardList extends PureComponent {
	onHeaderPrimaryClick = e => {
		console.log('primary');
	};

	onHeaderSecondaryClick = e => {
		console.log('secondary');
	};

	render() {
		return (
			<div className="pure-u-1-5 board-list">
				<Card containerStyle={{ borderRadius: '10em' }}>
					<CardHeader
						style={{
							backgroundColor: blue300
						}}
						title={
							<InlineEditLink
								text={this.props.name}
								onClick={this.onHeaderPrimaryClick}
							/>
						}
						titleColor="#fff"
						subtitle={
							<InlineEditLink
								text={this.props.description}
								onClick={this.onHeaderSecondaryClick}
							/>
						}
						subtitleColor="#fff"
						avatar={this.props.avatar}
					>
						<FloatingCloseButton />
					</CardHeader>

					<CardText className="board-list-container">
						<List>
							{this.props.cards.map(card =>
								<ListItem
									key={card.name}
									children={
										<Avatar className="card-activity-count">
											{card.activity.length}
										</Avatar>
									}
									primaryText={card.name}
									secondaryText={card.description}
								/>
							)}
						</List>
					</CardText>

					<CardActions style={{ backgroundColor: grey50 }}>
						<FlatButton
							fullWidth={true}
							icon={<AddCircle />}
							hoverColor={cyan100}
							primary={true}
							label="Add Card"
						/>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default BoardList;
