require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Db remove deleted items helper", function() {
	before(function() {
		mockery.enable({
			warnOnUnregistered: false,
			useCleanCache: true,
		});
	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.resetCache();
	});

	it("Remove deleted items", function(done) {
		mockery.registerMock("../../../models/arcgis", module.exports = {
			remove: function() {
				return {
					exec: function() {
						var Q = require("q");
						var prom = Q.defer();

						prom.resolve({});

						return prom.promise;
					},
				};
			},
		});
		var RemoveDeletedItems = require("app/controllers/helpers/db/removeDeletedItems");
		var data = {
			toDelete: [{
				_id: "a",
			}],
		};

		RemoveDeletedItems(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("toDelete");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});
});
