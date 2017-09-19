import React, { Component } from "react";
import Paper from "material-ui/Paper";
import EditableTitle from "./EditableTitle";
import CardContainer from "../containers/CardContainer";

class List extends Component {
	constructor() {
		super();
		this.state = {
			titleEdit: false
		};
	}

	toggleTitleEdit = () => {
		this.setState({ titleEdit: !this.state.titleEdit });
	};

	saveTitle = async e => {
		if (e.charCode === 13) {
			await this.props.editList(
				this.props.parentId,
				this.props.id,
				"title",
				e.target.value
			);

			this.toggleTitleEdit();
		}
	};

	render() {
		return (
			<Paper className="list">
				<div className="title-grid">
					<div>
						<h3 onClick={this.toggleTitleEdit} onKeyPress={this.saveTitle}>
							<EditableTitle
								editing={this.state.titleEdit}
								title={this.props.title}
							/>
						</h3>
					</div>
					<div className="close-button-cell">
						<button
							className="close-button"
							onClick={e => {
								e.preventDefault();
								this.props.deleteList(this.props.id);
							}}
						>
							&times;
						</button>
					</div>
				</div>

				{!this.props.cards ? null : (
					<div>
						{this.props.cards.map(card => (
							<CardContainer key={card.id} card={card} />
						))}
						<a
							href=""
							onClick={e => {
								e.preventDefault();
								this.props.createCard(this.props.id, this.props.cards.length);
							}}
						>
							Add a Card
						</a>
					</div>
				)}
			</Paper>
		);
	}
}

export default List;
