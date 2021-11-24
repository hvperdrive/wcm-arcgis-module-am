require("rootpath")();
var expect = require("chai").expect;
var Q = require("q");
var rewire = require("rewire");
var mockery = require("mockery");

describe("Variables helper", function() {
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

	it("Check for valid url's", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {
							variables: {
								polygonUrl: "http://www.url-with-trailing-slash.com/",
								pointUrl: "http://www.url-without-trailing-slash.com",
								polylineUrl: "http://www.url-with-trailing-slash.com/",
							},
						},
					});
				},
			},
		});
		var VariableHelper = require("app/helpers/variables");

		VariableHelper.set({ name: "someName", version: "someVersion" });

		VariableHelper()
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("polygonUrl");
				expect(response.polygonUrl).to.be.equal("http://www.url-with-trailing-slash.com");
				expect(response).to.have.property("pointUrl");
				expect(response.pointUrl).to.be.equal("http://www.url-without-trailing-slash.com");
				expect(response).to.have.property("polylineUrl");
				expect(response.polylineUrl).to.be.equal("http://www.url-with-trailing-slash.com");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Check when no variables are returned", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {},
					});
				},
			},
		});
		var VariableHelper = require("app/helpers/variables");

		VariableHelper.set({ name: "someName", version: "someVersion" });

		VariableHelper()
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("Unable to get variables");
				done();
			});
	});

	it("Check url with trailing slash", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkUrl = VariableHelper.__get__("checkUrl");
		var url = "http://www.google.com/";
		var result = checkUrl(url);

		VariableHelper.set({ name: "someName", version: "someVersion" });

		expect(result).to.be.a("string");
		expect(result.slice(-1)).to.not.be.equal("/");
		done();
	});

	it("Check url without trailing slash", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkUrl = VariableHelper.__get__("checkUrl");
		var url = "http://www.google.com";
		var result = checkUrl(url);

		VariableHelper.set({ name: "someName", version: "someVersion" });

		expect(result).to.be.a("string");
		expect(result.slice(-1)).to.not.be.equal("/");
		done();
	});

	it("Check existing variables", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {
							variables: {
								polygonUrl: "http://www.url-with-trailing-slash.com/",
								pointUrl: "http://www.url-without-trailing-slash.com",
								polylineUrl: "http://www.url-with-trailing-slash.com/",
							},
						},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkVariables = VariableHelper.__get__("checkVariables");
		var data = {
			features: {
				variables: {
					polygonUrl: "http://www.url-with-trailing-slash.com/",
					pointUrl: "http://www.url-without-trailing-slash.com",
					polylineUrl: "http://www.url-with-trailing-slash.com/",
				},
			},
		};

		VariableHelper.set({ name: "someName", version: "someVersion" });

		checkVariables(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("polygonUrl");
				expect(response.polygonUrl).to.be.equal("http://www.url-with-trailing-slash.com");
				expect(response).to.have.property("pointUrl");
				expect(response.pointUrl).to.be.equal("http://www.url-without-trailing-slash.com");
				expect(response).to.have.property("polylineUrl");
				expect(response.polylineUrl).to.be.equal("http://www.url-with-trailing-slash.com");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Check non-existing variables", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkVariables = VariableHelper.__get__("checkVariables");
		var data = {
			features: {},
		};

		VariableHelper.set({ name: "someName", version: "someVersion" });

		checkVariables(data)
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("Unable to get variables");
				done();
			});
	});

	it("Check for empty url's", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						features: {
							variables: {
								polygonUrl: "",
								pointUrl: "",
								polylineUrl: "",
							},
						},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkVariables = VariableHelper.__get__("checkVariables");
		var data = {
			features: {
				variables: {
					polygonUrl: "",
					pointUrl: "",
					polylineUrl: "",
				},
			},
		};

		VariableHelper.set({ name: "someName", version: "someVersion" });

		checkVariables(data)
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("Url's not set");
				done();
			});
	});

	after(function() {
		// Remove our mocked nodemailer and disable mockery
		mockery.deregisterAll();
		mockery.disable();
	});
});
