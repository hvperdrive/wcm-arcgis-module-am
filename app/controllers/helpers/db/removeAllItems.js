require("rootpath")();
var ArcgisModel = require("../../../models/arcgis");

module.exports = function() {
    return ArcgisModel.remove({}).exec();
};
