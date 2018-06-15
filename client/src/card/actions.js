import { CARD_SET } from './constants';

export const cardSet = function cardSet(cards) {
	return {
		type: CARD_SET,
		cards
	}
}