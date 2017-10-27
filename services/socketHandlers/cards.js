const { Card } = require('../../models/index');
const {
	INTERNAL,
	ERROR,
	SUCCESS
} = require('../../../client/src/socket/events');

module.exports = {
	_getCard,
	_getCards,
	_createCard,
	_modifyCard,
	_deleteCard
};

async function _getCard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_CARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.GET_CARD_FAILURE, {
				error: ERROR.CARD_NO_ID
			});
		}

		const card = await Card.findOne({ id });
		if (!card) {
			return this.emit(INTERNAL.GET_CARD_FAILURE, {
				id,
				error: ERROR.CARD_NOT_EXISTS
			});
		}

		// All good.
		this.emit(INTERNAL.GET_CARD_SUCCESS, card);
	} catch (error) {
		this.emit(INTERNAL.GET_CARD_FAILURE, { error });
		console.error(error);
	}
}

async function _getCards(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.GET_CARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { options } = ctx.data;
		if (!options || !(typeof options === 'object')) {
			return this.emit(INTERNAL.GET_CARD_FAILURE, {
				error: ERROR.CARD_NO_OPTIONS
			});
		}

		const cards = await Card.find(options);
		if (!cards || !Array.isArray(cards) || !cards.length) {
			return this.emit(INTERNAL.GET_CARD_FAILURE, {
				error: ERROR.CARDS_NOT_FOUND
			});
		}

		// All good.
		this.emit(INTERNAL.GET_CARD_SUCCESS, cards);
	} catch (error) {
		this.emit(INTERNAL.GET_CARD_FAILURE, { error });
		console.error(error);
	}
}

async function _createCard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.CREATE_CARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { name } = ctx.data;
		if (!name || !name.length) {
			return this.emit(INTERNAL.CREATE_CARD_FAILURE, {
				error: ERROR.CARD_NO_NAME
			});
		}

		const exists = await Card.findOne({ name });
		if (exists) {
			return this.emit(INTERNAL.CREATE_CARD_FAILURE, {
				name,
				error: ERROR.CARD_EXISTS
			});
		}

		// All good.
		const card = await Card.create({ name });
		this.emit(INTERNAL.CREATE_CARD_SUCCESS, {
			card,
			message: SUCCESS.CREATE_CARD
		});
	} catch (error) {
		this.emit(INTERNAL.CREATE_CARD_FAILURE, { error });
		console.error(error);
	}
}

async function _modifyCard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.MODIFY_CARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id, name, description } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.MODIFY_CARD_FAILURE, {
				error: ERROR.CARD_NO_ID
			});
		}

		if ((!name || !name.length) && (!description || !description.length)) {
			return this.emit(INTERNAL.MODIFY_CARD_FAILURE, {
				error: ERROR.CARD_NO_OPTIONS
			});
		}

		const exists = await Card.findOne({ name });
		if (!exists) {
			return this.emit(INTERNAL.MODIFY_CARD_FAILURE, {
				name,
				error: ERROR.CARD_NOT_EXISTS
			});
		}

		// All good.
		await Card.update({ id }, { name, description });
		this.emit(INTERNAL.MODIFY_CARD_SUCCESS, {
			message: SUCCESS.MODIFY_CARD
		});
	} catch (error) {
		this.emit(INTERNAL.MODIFY_CARD_FAILURE, { error });
		console.error(error);
	}
}

async function _deleteCard(ctx) {
	try {
		if (!ctx.user) {
			return this.emit(INTERNAL.DELETE_CARD_FAILURE, {
				error: ERROR.USER_NONE
			});
		}

		const { id } = ctx.data;
		if (!id || !id.length) {
			return this.emit(INTERNAL.DELETE_CARD_FAILURE, {
				error: ERROR.CARD_NO_ID
			});
		}

		const card = await Card.find({ id });
		if (!card) {
			return this.emit(INTERNAL.DELETE_CARD_FAILURE, {
				name,
				error: ERROR.CARD_NOT_EXISTS
			});
		}

		// All good.
		await card.remove().exec();
		this.emit(INTERNAL.DELETE_CARD_SUCCESS, { message: SUCCESS.DELETE_CARD });
	} catch (error) {
		this.emit(INTERNAL.DELETE_CARD_FAILURE, { error });
		console.error(error);
	}
}
