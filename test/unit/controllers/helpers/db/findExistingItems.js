require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");
var rewire = require("rewire");

describe("Db find existing items helper", function() {
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

	it("Find single arcgis item based on params", function(done) {
		mockery.registerMock("../../../models/arcgis", module.exports = {
			findOne: function(data) {
				return {
					lean: function() {
						return {
							exec: function() {
								var items = {
									a: {
										contentRef: "a",
										drawingRef: "a",
										type: "point",
									},
									b: {
										contentRef: "b",
										drawingRef: "b",
										type: "point",
									},
								};

								return items[data.drawingRef];
							},
						};
					},
				};
			},
		});
		var FindExistingItems = require("app/controllers/helpers/db/findExistingItems");
		var data = {
			project: {
				uuid: "uuid",
				fields: {
					map: {
						shapes: [{
							uid: "a",
							item: "a",
							geometry: {
								type: "Point",
							},
						}, {
							uid: "b",
							item: "b",
							geometry: {
								type: "Point",
							},
						}],
					},
				},
			},
		};

		FindExistingItems(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("shapes");
				expect(response.shapes).to.be.an("array");
				expect(response.shapes).to.have.lengthOf(2);
				expect(response.shapes[0]).to.have.property("ref");
				expect(response.shapes[0].ref).to.have.property("drawingRef");
				expect(response.shapes[0].ref).to.have.property("type");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Map results", function(done) {
		var findExistingItems = rewire("app/controllers/helpers/db/findExistingItems");
		var map = findExistingItems.__get__("map");
		var data = {
			project: {
				uuid: "abc",
				fields: {
					map: {
						shapes: [{
							uid: "a",
							geometry: {
								type: "Point",
							},
						}, {
							uid: "b",
							geometry: {
								type: "Polygon",
							},
						}],
					},
				},
			},
		};
		var response = [{
			arcgisRef: "a",
			drawingRef: "a",
			contentRef: "a",
			type: "point",
		}, null];

		var result = map(data, response);

		expect(result).to.be.an("object");
		expect(result).to.have.property("project");
		expect(result).to.have.property("shapes");
		expect(result.shapes).to.be.an("array");
		expect(result.shapes).to.have.lengthOf(response.length);

		expect(result.shapes[0]).to.have.property("ref");
		expect(result.shapes[0].ref).to.be.an("object");
		expect(result.shapes[0].ref).to.have.property("arcgisRef");
		expect(result.shapes[0].ref.arcgisRef).to.be.equal("a");
		expect(result.shapes[0].ref).to.have.property("contentRef");
		expect(result.shapes[0].ref.contentRef).to.be.equal("a");
		expect(result.shapes[0].ref).to.have.property("drawingRef");
		expect(result.shapes[0].ref.drawingRef).to.be.equal("a");
		expect(result.shapes[0].ref).to.have.property("type");
		expect(result.shapes[0].ref.type).to.be.equal("point");

		expect(result.shapes[0]).to.have.property("shape");
		expect(result.shapes[0].shape).to.be.an("object");
		expect(result.shapes[0].shape).to.have.property("uid");
		expect(result.shapes[0].shape.uid).to.be.equal("a");
		expect(result.shapes[0].shape).to.have.property("geometry");
		expect(result.shapes[0].shape.geometry).to.have.property("type");
		expect(result.shapes[0].shape.geometry.type).to.be.equal("Point");

		expect(result.shapes[0]).to.have.property("method");
		expect(result.shapes[0].method).to.be.equal("updateFeatures");

		expect(result.shapes[1]).to.have.property("ref");
		expect(result.shapes[1].ref).to.be.an("object");
		expect(result.shapes[1].ref).to.have.property("contentRef");
		expect(result.shapes[1].ref.contentRef).to.be.equal("abc");
		expect(result.shapes[1].ref).to.have.property("drawingRef");
		expect(result.shapes[1].ref.drawingRef).to.be.equal("b");
		expect(result.shapes[1].ref).to.have.property("type");
		expect(result.shapes[1].ref.type).to.be.equal("polygon");

		expect(result.shapes[1]).to.have.property("shape");
		expect(result.shapes[1].shape).to.be.an("object");
		expect(result.shapes[1].shape).to.have.property("uid");
		expect(result.shapes[1].shape.uid).to.be.equal("b");
		expect(result.shapes[1].shape).to.have.property("geometry");
		expect(result.shapes[1].shape.geometry).to.have.property("type");
		expect(result.shapes[1].shape.geometry.type).to.be.equal("Polygon");

		expect(result.shapes[1]).to.have.property("method");
		expect(result.shapes[1].method).to.be.equal("addFeatures");

		done();
	});
});
