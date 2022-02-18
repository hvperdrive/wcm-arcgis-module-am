var _ = require("lodash");

module.exports = function(data, variables) {
	// Check if we need to call the arcgis API based on safeLabel of CT
	return (_.get(data, "meta.contentType._id") && data.meta.contentType._id.toString() === variables.projectContentTypeId);
};
