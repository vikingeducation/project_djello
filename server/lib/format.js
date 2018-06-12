function format(arr) {

	let byId = {};
	let allIds = [];

	arr.forEach(item => {
		
		let id = item._id;

		byId[id] = item;
		allIds.push(id);
	})

	return {
		byId,
		allIds
	};
}

function flatten(arrs) {
	return arrs.reduce((acc, curr) => {
		return acc.concat(curr)
	}, []);
}

module.exports = {
	format,
	flatten
}