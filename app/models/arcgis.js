var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uuid = require("node-uuid");

delete mongoose.models.Arcgis;
delete mongoose.modelSchemas.Arcgis;

var ArcgisSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
	},
	contentRef: {
		type: String,
		ref: "Content",
		required: true,
	},
	drawingRef: {
		type: String,
		required: true,
	},
	arcgisRef: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["point", "polygon"],
	},
});

// Set the name of the collection
ArcgisSchema.set("collection", "arcgis");
module.exports = mongoose.model("Arcgis", ArcgisSchema);
