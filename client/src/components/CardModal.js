import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import EditableTitle from "./EditableTitle";
import EditableDescription from "./EditableDescription";
import RaisedButton from "material-ui/RaisedButton";

class CardModal extends Component {
	constructor() {
		super();
		this.state = {
			title: null,
			description: null,
			editTitle: false,
			editDescription: false
		};
	}

	componentDidMount() {
		this.setState({
			title: this.props.card.title,
			description: this.props.card.description
		});
	}

	toggleTitleEdit = () => {
		this.setState({ editTitle: !this.state.editTitle });
	};

	toggleDescriptionEdit = () => {
		this.setState({ editDescription: !this.state.editDescription });
	};

	saveTitle = e => {
		if (e.charCode === 13) {
			this.setState({ title: e.target.value });

			this.toggleTitleEdit();
		}
	};

	saveDescription = e => {
		if (e.charCode === 13) {
			e.preventDefault();
			this.setState({ description: e.target.value });
			this.toggleDescriptionEdit();
		}
	};

	render() {
		return (
			<Dialog
				open={this.props.open}
				modal={true}
				onRequestClose={this.props.close}
				actions={[
					<RaisedButton label="Cancel" onClick={this.props.close} />,
					<RaisedButton
						primary={true}
						label="Save"
						onClick={() => {
							this.props.saveCard(
								this.props.boardId,
								this.props.card.listId,
								this.props.card.id,
								{
									title: this.state.title,
									description: this.state.description
								}
							);
							this.props.close();
						}}
					/>
				]}
			>
				<h2 onKeyPress={this.saveTitle}>
					<EditableTitle
						rows={1}
						multiLine={false}
						title={this.state.title}
						editing={this.state.editTitle}
						toggle={this.toggleTitleEdit}
					/>
				</h2>
				<p onKeyPress={this.saveDescription}>
					<EditableDescription
						rows={7}
						text={this.state.description}
						editing={this.state.editDescription}
						toggle={this.toggleDescriptionEdit}
					/>
				</p>
			</Dialog>
		);
	}
}

export default CardModal;
