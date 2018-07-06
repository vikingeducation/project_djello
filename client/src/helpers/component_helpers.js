
function sortIds(ids, objList) {
	return ids.map(id => {
		return objList[id];
	}).sort(function(a, b) {
		return a.position - b.position;
	})
}

module.exports = {
	sortIds,
}