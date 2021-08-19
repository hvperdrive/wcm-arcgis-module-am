require("rootpath")();
var Q = require("q");
var sinon = require("sinon");
var expect = require("chai").expect;
var proxyquire = require("proxyquire");

describe("Db remove all items helper", function() {
	it("Remove all items", function() {
		var execSpy = sinon.spy(Q.when.bind(null, {}));
		var removeSpy = sinon.spy(function() {
			return {
				exec: execSpy,
			};
		});

		var RemoveAllItems = proxyquire("../../../../../app/controllers/helpers/db/removeAllItems", {
			"../../../models/arcgis": { remove: removeSpy },
		});

		return RemoveAllItems()
			.then(function onSuccess() {
				expect(removeSpy.calledOnce).to.be.true;
				expect(removeSpy.firstCall.args).to.eql([{}]);
				expect(execSpy.calledOnce).to.be.true;
			});
	});
});
