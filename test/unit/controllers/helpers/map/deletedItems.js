require("rootpath")();
var expect = require("chai").expect;

var MapHelper = require("app/controllers/helpers/map");

describe("Map deleted items helper", function() {
	it("Map items to delete/keep", function(done) {
		var data = {
			all: [{
				contentRef: "content1",
				drawingRef: "drawing1",
				type: "point",
			}, {
				contentRef: "content2",
				drawingRef: "drawing2",
				type: "point",
			}],
			shapes: [{
				ref: {
					contentRef: "content1",
					drawingRef: "drawing1",
					type: "point",
				},
			}],
		};
		var result = MapHelper.deletedItems(data);

		expect(result).to.be.an("object");
		expect(result).to.have.property("all");
		expect(result).to.have.property("shapes");
		expect(result).to.have.property("toDelete");
		expect(result.toDelete).to.be.an("array");
		expect(result.toDelete).to.have.lengthOf(1);
		expect(result.toDelete[0]).to.be.an("object");
		expect(result.toDelete[0]).to.have.property("contentRef");
		expect(result.toDelete[0].contentRef).to.be.equal("content2");
		expect(result.toDelete[0]).to.have.property("drawingRef");
		expect(result.toDelete[0].drawingRef).to.be.equal("drawing2");

		done();
	});
});
