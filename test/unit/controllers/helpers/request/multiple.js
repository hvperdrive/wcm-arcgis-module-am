require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");
var executeMock = module.exports = function(options) {
    var Q = require("q");
    var prom = Q.defer();

    if (options) {
        prom.resolve({
            objectId: "value"
        });
    } else {
        prom.reject();
    }

    return prom.promise;
};

describe("Fire multiple requests helper", function() {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock("./execute", executeMock);
    });

    it("Execute multiple options with success response", function(done) {
        var RequestHelper = require("app/controllers/helpers/request");
        var data = {
            multiple: [{
                ref: {},
                options: true
            }]
        };

        RequestHelper.multiple(data, "multiple")
            .then(function onSuccess(response) {
                expect(response).to.be.an("object");
                expect(response).to.have.property("multiple");
                expect(response.multiple).to.have.lengthOf(data.multiple.length);
                expect(response.multiple[0]).to.have.property("ref");
                expect(response.multiple[0].ref).to.have.property("arcgisRef");
                expect(response.multiple[0].ref.arcgisRef).to.be.equal("value");

                done();
            }, function onError(responseError) {
                expect(responseError).to.be.undefined;
                done();
            });

    });

    it("Execute multiple options with error response", function(done) {
        var RequestHelper = require("app/controllers/helpers/request");
        var data = {
            multiple: [{
                ref: {},
                options: false
            }]
        };

        RequestHelper.multiple(data, "multiple")
            .then(function onSuccess(response) {
                expect(response).to.be.an("object");
                expect(response).to.have.property("multiple");
                expect(response.multiple).to.have.lengthOf(data.multiple.length);
                expect(response.multiple[0]).to.have.property("ref");
                expect(response.multiple[0].ref).to.not.have.property("arcgisRef");

                done();
            }, function onError(responseError) {
                expect(responseError).to.be.undefined;
                done();
            });

    });

    after(function() {
        // Remove our mocked nodemailer and disable mockery
        mockery.deregisterAll();
        mockery.disable();
    });
});
