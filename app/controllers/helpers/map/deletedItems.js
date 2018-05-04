require("rootpath")();
var _ = require("lodash");

module.exports = function(data) {
	// Check which items should be removed which exists in the db
	data.toDelete = _.remove(data.all, function(a) {
		// Find the shape
		return !~_.findIndex(data.shapes, function(s) {
			return (
				// Check the contentRef
				s.ref.contentRef.toString() === a.contentRef.toString() &&
				// Check the drawingRef
				s.ref.drawingRef.toString() === a.drawingRef.toString() &&
				// Check the type
				s.ref.type === a.type
			);
		});
	});

	return data;
};
