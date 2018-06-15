import { LIST_SET } from './constants';

export const listSet = function listSet(lists) {
	return {
		type: LIST_SET,
		lists
	}
}