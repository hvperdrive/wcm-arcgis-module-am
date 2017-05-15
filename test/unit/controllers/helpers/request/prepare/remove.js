require("rootpath")();
var expect = require("chai").expect;

var RequestHelper = require("app/controllers/helpers/request");

describe("Request prepare remove helper", function() {
    it("Create options for remove requests", function(done) {
        var data = {
            variables: {
                polygonUrl: "polygon",
                pointUrl: "poin"
            },
            toDelete: [{
                type: "point",
                geometry: "geometry",
                arcgisRef: 1
            }]
        };
        var result = RequestHelper.prepare.remove(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("toDelete");
        expect(result.toDelete).to.be.an("array");
        expect(result.toDelete).to.have.lengthOf(data.toDelete.length);
        expect(result.toDelete[0]).to.have.property("options");
        expect(result.toDelete[0].options).to.be.an("object");
        expect(result.toDelete[0].options).to.have.property("json");
        expect(result.toDelete[0].options.json).to.be.true;
        expect(result.toDelete[0].options).to.have.property("method");
        expect(result.toDelete[0].options.method).to.be.equal("POST");
        expect(result.toDelete[0].options).to.have.property("url");
        expect(result.toDelete[0].options.url).to.be.equal(data.variables.pointUrl + "/deleteFeatures");
        expect(result.toDelete[0].options).to.have.property("qs");
        expect(result.toDelete[0].options.qs).to.be.an("object");
        expect(result.toDelete[0].options.qs).to.have.property("f");
        expect(result.toDelete[0].options.qs.f).to.be.equal("json");
        expect(result.toDelete[0].options.qs).to.have.property("objectIds");
        expect(result.toDelete[0].options.qs.objectIds).to.be.equal(data.toDelete[0].arcgisRef);

        done();
    });
});
