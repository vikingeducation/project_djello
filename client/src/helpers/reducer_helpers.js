function removeIdFromAllIds(arr, obj) {
	return arr.filter(item => {
		return item !== obj._id;
	})
}

function removeObjById(obj, toRemove) {
	const key = toRemove._id
	const { [key]: del, ...restOfItems } = obj

	return restOfItems
}


function removeObjByParentId(obj, parent, prop) {
	return Object.keys(obj).reduce((acc, key) => {
		if(obj[key][prop] !== parent._id) {
			return {...acc, [key]: obj[key]}
		}
		return acc;
	}, {})
}

function removeIdByParentId(obj, parent, prop) {

	return Object.keys(obj).reduce((acc, key) => {
		if(obj[key][prop] !== parent._id) {
			return [ ...acc, obj[key]._id ]
		}
		return acc;
	}, [])
}


function removeCardsByListIds(obj, arr) {

	return Object.keys(obj).reduce((acc, key) => {

		let id = obj[key].listId.toString();
		
		if(arr.indexOf(id) === -1) {
			return { ...acc, [key]: obj[key] }
		}
		return acc;

	}, {})
}


function removeCardIdsByListIds(obj, arr) {

	return Object.keys(obj).reduce((acc, key) => {

		let id = obj[key].listId.toString();
		let ownId = obj[key]._id.toString();

		if(arr.indexOf(id) === -1) {
			return [ ...acc, ownId ]
		}
		return acc;

	}, [])

}

function removeCardsByListIds(obj, arr) {

	return Object.keys(obj).reduce((acc, key) => {

		let id = obj[key].listId.toString();
		if(arr.indexOf(id) === -1) {
			return { ...acc, [key]: obj[key] }
		}
		return acc;

	}, {})
}


function removeCardIdsByListIds(obj, arr) {

	return Object.keys(obj).reduce((acc, key) => {

		let id = obj[key].listId.toString();
		let ownId = obj[key]._id.toString();
		if(arr.indexOf(id) === -1) {
			return [ ...acc, ownId ]
		}
		return acc;

	}, [])

}

module.exports = {
	removeIdFromAllIds,
	removeObjById,
	removeObjByParentId,
	removeIdByParentId,
	removeCardsByListIds,
	removeCardIdsByListIds
}