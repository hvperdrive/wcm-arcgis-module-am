require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Db find deleted items helper", function() {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    it("Find deleted content items", function(done) {
        mockery.registerMock("../../../models/arcgis", module.exports = {
            find: function() {
                return {
                    lean: function lean() {
                        return {
                            exec: function exec() {
                                var Q = require("q");
                                var prom = Q.defer();

                                prom.resolve([{
                                    project: {
                                        uuid: "abc"
                                    }
                                }]);

                                return prom.promise;
                            }
                        };
                    }
                };
            }
        });
        var DbHelper = require("app/controllers/helpers/db");
        var data = {
            project: {
                uuid: "abc"
            }
        };

        DbHelper.findDeletedItems(data)
            .then(function onSuccess(response) {
                expect(response).to.be.an("object");
                expect(response).to.have.property("all");
                expect(response.all).to.be.an("array");
                expect(response.all).to.have.lengthOf(1);
                expect(response.all[0]).to.have.property("project");
                expect(response.all[0].project).to.have.property("uuid");
                expect(response.all[0].project.uuid).to.be.equal("abc");
                done();
            }, function onError(responseError) {
                expect(responseError).to.be.undefined;
                done();
            });
    });

    it("Error on finding deleted content items", function(done) {
        mockery.registerMock("../../../models/arcgis", module.exports = {
            find: function() {
                return {
                    lean: function() {
                        return {
                            exec: function() {
                                var Q = require("q");
                                var prom = Q.defer();

                                prom.reject({
                                    err: "some error"
                                });

                                return prom.promise;
                            }
                        };
                    }
                };
            }
        });
        var DbHelper = require("app/controllers/helpers/db");
        var data = {
            project: {
                uuid: "abc"
            }
        };

        DbHelper.findDeletedItems(data)
            .then(function onSuccess(response) {
                expect(response).to.be.an("object");
                expect(response).to.have.property("all");
                expect(response.all).to.be.an("array");
                expect(response.all).to.have.lengthOf(0);
                done();
            }, function onError(responseError) {
                expect(responseError).to.be.undefined;
                done();
            });
    });
});
