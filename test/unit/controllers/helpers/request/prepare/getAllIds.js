require("rootpath")();
var expect = require("chai").expect;

var RequestHelper = require("app/controllers/helpers/request");

describe("Request prepare get all helper", function() {
	it("Create request options to get all polygon items", function() {
		var variables = {
			polygonUrl: "polygon",
			pointUrl: "point",
		};
		var result = RequestHelper.prepare.getAllIds(variables);

		expect(result).to.be.an("array");
		expect(result[0]).to.have.property("json", true);
		expect(result[0]).to.have.property("method", "GET");
		expect(result[0]).to.have.property("url", "polygon/query");
		expect(result[0]).to.haveOwnProperty("qs");
		expect(result[0].qs).to.be.an("object");
		expect(result[0].qs).to.have.property("f", "json");
		expect(result[0].qs).to.have.property("where", "1=1");
		expect(result[0].qs).to.have.property("returnIdsOnly", true);
		expect(result[1]).to.have.property("json", true);
		expect(result[1]).to.have.property("method", "GET");
		expect(result[1]).to.have.property("url", "point/query");
		expect(result[1]).to.haveOwnProperty("qs");
		expect(result[1].qs).to.be.an("object");
		expect(result[1].qs).to.have.property("f", "json");
		expect(result[1].qs).to.have.property("where", "1=1");
		expect(result[1].qs).to.have.property("returnIdsOnly", true);
	});
});
