require("rootpath")();
var Q = require("q");
var path = require("path");
var sinon = require("sinon");
var expect = require("chai").expect;
var proxyquire = require("proxyquire");

describe("Db remove all items helper", function () {
	it("Remove all items", function () {
		var execSpy = sinon.spy(Q.when.bind(null, []));
		var leanSpy = sinon.spy(function () {
			return {
				exec: execSpy
			};
		})
		var populateSpy = sinon.spy(function () {
			return {
				lean: leanSpy
			};
		});
		var findSpy = sinon.spy(function () {
			return {
				populate: populateSpy
			};
		});

		var RemoveAllItems = proxyquire("../../../../../app/controllers/helpers/db/getAllProjects", {
			[path.join(process.cwd(), "app/models/content")]: {
				find: findSpy,
				'@noCallThru': true,
			},
		});

		return RemoveAllItems()
			.then(function onSuccess(response) {
				expect(findSpy.calledOnce).to.be.true;
				expect(findSpy.firstCall.args).to.eql([{
					"meta.deleted": false,
					"meta.published": true
				}]);
				expect(populateSpy.calledOnce).to.be.true;
				expect(populateSpy.firstCall.args).to.eql(["meta.contentType"])
				expect(leanSpy.calledOnce).to.be.true;
				expect(execSpy.calledOnce).to.be.true;
				expect(response).to.eql([]);
			});
	});
});
