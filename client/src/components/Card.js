import React, { Component } from "react";
import Paper from "material-ui/Paper";
import EditableTitle from "./EditableTitle";

class Card extends Component {
	constructor() {
		super();
		this.state = {
			titleEdit: false
		};
	}

	deleteCard = e => {
		e.preventDefault();
		e.stopPropagation();
		this.props.deleteCard(this.props.card.id);
	};

	render() {
		return (
			<Paper
				className="card"
				onClick={() => {
					this.props.onClick(this.props.card);
				}}
			>
				<div className="title-grid">
					<div>
						<h4>{this.props.card.title}</h4>
					</div>
					<div className="close-button-cell">
						<button href="" className="close-button" onClick={this.deleteCard}>
							&times;
						</button>
					</div>
				</div>
				<div className="card-description">
					<p>{this.props.card.description}</p>
				</div>
			</Paper>
		);
	}
}

export default Card;
