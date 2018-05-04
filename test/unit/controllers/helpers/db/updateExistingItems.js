require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Db update existing items helper", function() {
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

	it("Update all shapes successfully", function(done) {
		mockery.registerMock("../../../models/arcgis", module.exports = {
			update: function() {
				return {
					lean: function() {
						return {
							exec: function() {
								var Q = require("q");
								var prom = Q.defer();

								prom.resolve({
									success: true,
								});

								return prom.promise;
							},
						};
					},
				};
			},
		});
		var UpdateExistingItems = require("app/controllers/helpers/db/updateExistingItems");
		var data = {
			shapes: [{
				ref: {
					contentRef: "abc",
					arcgisRef: "abc",
					drawingRef: "abc",
					type: "point",
				},
			}, {}],
		};

		UpdateExistingItems(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("shapes");
				expect(response.shapes).to.be.an("array");
				expect(response.shapes).to.have.lengthOf(2);
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Update all shapes with errors", function(done) {
		mockery.registerMock("../../../models/arcgis", module.exports = {
			update: function() {
				return {
					lean: function() {
						return {
							exec: function() {
								var Q = require("q");
								var prom = Q.defer();

								prom.reject({
									success: false,
								});

								return prom.promise;
							},
						};
					},
				};
			},
		});
		var UpdateExistingItems = require("app/controllers/helpers/db/updateExistingItems");
		var data = {
			shapes: [{
				ref: {
					contentRef: "abc",
					arcgisRef: "abc",
					drawingRef: "abc",
					type: "point",
				},
			}, {}],
		};

		UpdateExistingItems(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("shapes");
				expect(response.shapes).to.be.an("array");
				expect(response.shapes).to.have.lengthOf(2);
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});
});
