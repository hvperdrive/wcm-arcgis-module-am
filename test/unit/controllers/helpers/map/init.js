require("rootpath")();
var expect = require("chai").expect;

var MapHelper = require("app/controllers/helpers/map");

describe("Map init helper", function() {
	it("Map init values to begin", function(done) {
		var project = "project";
		var variables = "variables";
		var result = MapHelper.init(project, variables);

		expect(result).to.be.an("object");
		expect(result).to.have.property("project");
		expect(result.project).to.be.equal("project");
		expect(result).to.have.property("variables");
		expect(result.variables).to.be.equal("variables");

		done();
	});
});
