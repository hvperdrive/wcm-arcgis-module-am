require("rootpath")();
var expect = require("chai").expect;

var RequestHelper = require("app/controllers/helpers/request");

describe("Request prepare get all helper", function() {
	it("Create request options to get all polygon items", function() {
		var variables = {
			polygonUrl: "polygon",
			pointUrl: "point",
		};
		var result = RequestHelper.prepare.removeAll(variables, [1, 2, 3], [3, 2, 1]);

		expect(result).to.be.an("array");
		expect(result[0]).to.have.property("json", true);
		expect(result[0]).to.have.property("method", "POST");
		expect(result[0]).to.have.property("url", "polygon/deleteFeatures");
		expect(result[0]).to.haveOwnProperty("qs");
		expect(result[0].qs).to.be.an("object");
		expect(result[0].qs).to.have.property("f", "json");
		expect(result[0].qs).to.have.property("where", "1=1");
		expect(result[0].qs).to.have.property("objectIds", "1,2,3");
		expect(result[1]).to.have.property("json", true);
		expect(result[1]).to.have.property("method", "POST");
		expect(result[1]).to.have.property("url", "point/deleteFeatures");
		expect(result[1]).to.haveOwnProperty("qs");
		expect(result[1].qs).to.be.an("object");
		expect(result[1].qs).to.have.property("f", "json");
		expect(result[1].qs).to.have.property("where", "1=1");
		expect(result[1].qs).to.have.property("objectIds", "3,2,1");
	});
});
