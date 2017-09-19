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

	toggleTitleEdit = () => {
		this.setState({ titleEdit: !this.state.titleEdit });
	};

	render() {
		return (
			<Paper className="card">
				<div className="title-grid">
					<div>
						<h4 onClick={this.toggleTitleEdit}>
							<EditableTitle
								title={this.props.card.title}
								editing={this.state.titleEdit}
							/>
						</h4>
					</div>
					<div className="close-button-cell">
						<button
							href=""
							className="close-button"
							onClick={e => {
								e.preventDefault();
								this.props.deleteCard(this.props.card.id);
							}}
						>
							&times;
						</button>
					</div>
				</div>
				<p>{this.props.card.description}</p>
			</Paper>
		);
	}
}

export default Card;
