var R = require("ramda");
var path = require("path");

var ContentModel = require(path.join(process.cwd(), "app/models/content"));

module.exports = function getAllProjects() {
	return ContentModel.find({
		"meta.deleted": false,
		"meta.published": true,
	})
	.populate("meta.contentType")
	.lean()
	.exec()
	.then(R.filter(R.pathEq(["meta", "contentType", "meta", "safeLabel"], "projecten")));
};
