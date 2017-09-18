import React from "react";
import Paper from "material-ui/Paper";
import CardContainer from "../containers/CardContainer";

const List = ({ id, title, cards, deleteList, createCard }) => {
	return (
		<Paper className="list">
			<h3>{title}</h3>
			<button
				className="close-button"
				onClick={e => {
					e.preventDefault();
					deleteList(id);
				}}
			>
				&times;
			</button>

			{!cards ? null : (
				<div>
					{cards.map(card => <CardContainer key={card.id} card={card} />)}
					<a
						href=""
						onClick={e => {
							e.preventDefault();
							createCard(id, cards.length);
						}}
					>
						Add a Card
					</a>
				</div>
			)}
		</Paper>
	);
};

export default List;
