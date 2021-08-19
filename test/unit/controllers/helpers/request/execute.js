require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Request execute helper", function() {
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

	it("Execute request with a single add result", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				addResults: [{
					success: true,
					objectId: 1,
				}],
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		RequestHelper.execute({ method: "POST" })
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("objectId");
				expect(response.objectId).to.be.equal(1);
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Execute request with a single update result", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				updateResults: [{
					success: true,
					objectId: 1,
				}],
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		RequestHelper.execute({ method: "POST" })
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("objectId");
				expect(response.objectId).to.be.equal(1);
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Execute request with a getAll result", function() {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				"objectIdFieldName": "OBJECTID",
				"objectIds": [3201, 3601, 3602, 3603, 4810, 5210, 5612],
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		return RequestHelper.execute({ method: "GET" })
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("objectIds");
				expect(response.objectIds).to.be.an("array")
					.and.to.have.lengthOf(7);
			});
	});

	it("Execute request with a server error response", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = "server error";
			var data = {
				statusCode: 500,
			};
			var body = {};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		RequestHelper.execute({ method: "POST" })
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("server error");
				done();
			});
	});

	it("Execute request with unknown ArcGIS error", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				success: false,
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		RequestHelper.execute({ method: "POST" })
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("Unknown ArcGIS error");
				done();
			});
	});

	it("Execute request without objectId in the response", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				addResults: [{
					success: true,
				}],
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		RequestHelper.execute({ method: "POST" })
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("ObjectId not received from ArcGIS");
				done();
			});
	});

	it("Execute request without success in the response", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				addResults: [{
					objectId: 1,
				}],
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/request");

		RequestHelper.execute({ method: "POST" })
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("ObjectId not received from ArcGIS");
				done();
			});
	});

	after(function() {
		// Remove our mocked nodemailer and disable mockery
		mockery.deregisterAll();
		mockery.disable();
	});
});
