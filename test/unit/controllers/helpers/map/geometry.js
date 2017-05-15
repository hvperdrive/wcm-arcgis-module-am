require("rootpath")();
var expect = require("chai").expect;

var MapHelper = require("app/controllers/helpers/map");

describe("Map geometry helper", function() {
    it("Map geometry point for arcgis", function(done) {
        var data = {
            shapes: [{
                attributes: {},
                shape: {
                    geometry: {
                        coordinates: [4, 51],
                        type: "Point"
                    }
                }
            }]
        };
        var result = MapHelper.geometry(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("shapes");
        expect(result.shapes).to.be.an("array");
        expect(result.shapes).to.have.lengthOf(data.shapes.length);

        expect(result.shapes[0]).to.have.property("shape");
        expect(result.shapes[0]).to.have.property("geometry");
        expect(result.shapes[0].geometry).to.be.an("array");
        expect(result.shapes[0].geometry).to.have.lengthOf(1);
        expect(result.shapes[0].geometry[0]).to.have.property("geometry");
        expect(result.shapes[0].geometry[0].geometry).to.have.property("spatialReference");
        expect(result.shapes[0].geometry[0].geometry.spatialReference).to.have.property("wkid");
        expect(result.shapes[0].geometry[0].geometry.spatialReference.wkid).to.be.equal(4326);

        expect(result.shapes[0].geometry[0].geometry).to.have.property("x");
        expect(result.shapes[0].geometry[0].geometry.x).to.be.equal(4);
        expect(result.shapes[0].geometry[0].geometry).to.have.property("y");
        expect(result.shapes[0].geometry[0].geometry.y).to.be.equal(51);

        expect(result.shapes[0]).to.have.property("attributes");

        done();
    });

    it("Map geometry polygon for arcgis", function(done) {
        var data = {
            shapes: [{
                attributes: {},
                shape: {
                    geometry: {
                        type: "Polygon",
                        coordinates: []
                    }
                }
            }]
        };
        var result = MapHelper.geometry(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("shapes");
        expect(result.shapes).to.be.an("array");
        expect(result.shapes).to.have.lengthOf(data.shapes.length);

        expect(result.shapes[0]).to.have.property("shape");
        expect(result.shapes[0]).to.have.property("geometry");
        expect(result.shapes[0].geometry).to.be.an("array");
        expect(result.shapes[0].geometry).to.have.lengthOf(1);
        expect(result.shapes[0].geometry[0]).to.have.property("geometry");
        expect(result.shapes[0].geometry[0].geometry).to.have.property("spatialReference");
        expect(result.shapes[0].geometry[0].geometry.spatialReference).to.have.property("wkid");
        expect(result.shapes[0].geometry[0].geometry.spatialReference.wkid).to.be.equal(4326);

        expect(result.shapes[0].geometry[0].geometry).to.have.property("rings");
        expect(result.shapes[0].geometry[0].geometry.rings).to.be.an("array");
        expect(result.shapes[0].geometry[0].geometry.rings).to.have.lengthOf(0);

        expect(result.shapes[0]).to.have.property("attributes");

        done();
    });

    it("Map geometry for undefined type", function(done) {
        var data = {
            shapes: [{
                attributes: {},
                shape: {
                    geometry: {
                        type: "line",
                        coordinates: []
                    }
                }
            }]
        };
        var result = MapHelper.geometry(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("shapes");
        expect(result.shapes).to.be.an("array");
        expect(result.shapes).to.have.lengthOf(data.shapes.length);

        expect(result.shapes[0]).to.have.property("shape");
        expect(result.shapes[0]).to.have.property("geometry");
        expect(result.shapes[0].geometry).to.be.an("array");
        expect(result.shapes[0].geometry).to.have.lengthOf(1);
        expect(result.shapes[0].geometry[0]).to.have.property("geometry");

        expect(result.shapes[0].geometry[0].geometry).to.not.have.property("rings");
        expect(result.shapes[0].geometry[0].geometry).to.not.have.property("x");
        expect(result.shapes[0].geometry[0].geometry).to.not.have.property("y");

        done();
    });
});
