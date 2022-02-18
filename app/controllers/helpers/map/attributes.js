var _ = require("lodash");

module.exports = function(data) {
	// Loop over the shapes
	data.shapes.forEach(function(item) {
		// Set attributes for arcigs
		item.attributes = {
			uuid: data.project.uuid,
			title: data.project.fields.title.nl.substring(0, 255),
			intro: data.project.fields.intro.nl.substring(0, 255),
			lastModified: data.project.meta.lastModified,
			created: data.project.meta.created,
			Link: "/projecten/" + data.project.meta.slug.nl,
		};

		// If arcgisRef is defined, we need to updated the item
		if (_.get(item, "ref.arcgisRef")) {
			item.attributes.ObjectId = parseInt(item.ref.arcgisRef);
		}
	});

	return data;
};
