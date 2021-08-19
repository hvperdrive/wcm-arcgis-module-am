require("rootpath")();
var expect = require("chai").expect;

var RequestHelper = require("app/controllers/helpers/request");

describe("Request prepare upsert helper", function() {
	it("Create options for upsert requests", function(done) {
		var data = {
			variables: {
				polygonUrl: "polygon",
				pointUrl: "poin",
			},
			shapes: [{
				ref: {
					type: "point",
				},
				method: "add",
				geometry: "geometry",
			}],
		};
		var result = RequestHelper.prepare.upsert(data);

		expect(result).to.be.an("object");
		expect(result).to.have.property("shapes");
		expect(result.shapes).to.be.an("array");
		expect(result.shapes).to.have.lengthOf(data.shapes.length);
		expect(result.shapes[0]).to.have.property("options");
		expect(result.shapes[0].options).to.be.an("object");
		expect(result.shapes[0].options).to.have.property("json");
		expect(result.shapes[0].options.json).to.be.true;
		expect(result.shapes[0].options).to.have.property("method");
		expect(result.shapes[0].options.method).to.be.equal("POST");
		expect(result.shapes[0].options).to.have.property("url");
		expect(result.shapes[0].options.url).to.be.equal(data.variables.pointUrl + "/" + data.shapes[0].method);
		expect(result.shapes[0].options).to.have.property("qs");
		expect(result.shapes[0].options.qs).to.be.an("object");
		expect(result.shapes[0].options.qs).to.have.property("f");
		expect(result.shapes[0].options.qs.f).to.be.equal("json");
		expect(result.shapes[0].options.qs).to.have.property("features");
		expect(result.shapes[0].options.qs.features).to.be.equal("\"geometry\"");

		done();
	});
});
