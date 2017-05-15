require("rootpath")();
var Q = require("q");
var ArcgisModel = require("../../../models/arcgis");

module.exports = function(data) {
    var prom = Q.defer();

    data.all = [];

    // Find all items for a single content item
    ArcgisModel
        .find({
            contentRef: data.project.uuid
        })
        .lean()
        .exec()
        .then(function onSuccess(response) {
            data.all = response;
            prom.resolve(data);
        })
        .catch(function() {
            prom.resolve(data);
        });

    return prom.promise;
};
