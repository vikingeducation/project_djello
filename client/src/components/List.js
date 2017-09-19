import React, { Component } from "react";
import Paper from "material-ui/Paper";
import EditableTitle from "./EditableTitle";
import CardContainer from "../containers/CardContainer";
import CardModal from "./CardModal";

class List extends Component {
	constructor() {
		super();
		this.state = {
			titleEdit: false,
			card: null,
			cardOpen: false
		};
	}

	toggleTitleEdit = () => {
		this.setState({ titleEdit: !this.state.titleEdit });
	};

	saveTitle = async e => {
		if (e.charCode === 13) {
			await this.props.editList(
				this.props.boardId,
				this.props.id,
				"title",
				e.target.value
			);

			this.toggleTitleEdit();
		}
	};

	showCardModal = card => {
		this.setState({ card: card, cardOpen: true });
	};

	closeCardModal = () => {
		this.setState({ card: null, cardOpen: false });
	};

	render() {
		return (
			<Paper className="list">
				<div className="title-grid">
					<div>
						<h3 onKeyPress={this.saveTitle}>
							<EditableTitle
								editing={this.state.titleEdit}
								title={this.props.title}
								toggle={this.toggleTitleEdit}
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
							<CardContainer
								key={card.id}
								card={card}
								onClick={this.showCardModal}
							/>
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
				{!this.state.card ? null : (
					<CardModal
						saveCard={this.props.editCard}
						boardId={this.props.boardId}
						open={this.state.cardOpen}
						close={this.closeCardModal}
						card={this.state.card}
					/>
				)}
			</Paper>
		);
	}
}

export default List;
