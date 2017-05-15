require("rootpath")();
var expect = require("chai").expect;

var MapHelper = require("app/controllers/helpers/map");

describe("Map attributes helper", function() {
    it("Map attributes for new items", function(done) {
        var data = {
            project: {
                uuid: "abc",
                meta: {
                    lastModified: "lastModified",
                    created: "created",
                    slug: {
                        nl: "slug"
                    }
                },
                fields: {
                    title: {
                        nl: "Title"
                    },
                    intro: {
                        nl: "Intro"
                    }
                }
            },
            shapes: [{}]
        };
        var result = MapHelper.attributes(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("project");
        expect(result).to.have.property("shapes");
        expect(result.shapes).to.have.lengthOf(data.shapes.length);
        expect(result.shapes[0]).to.have.property("attributes");
        expect(result.shapes[0].attributes).to.be.an("object");
        expect(result.shapes[0].attributes).to.have.property("uuid");
        expect(result.shapes[0].attributes.uuid).to.be.equal(data.project.uuid);
        expect(result.shapes[0].attributes).to.have.property("title");
        expect(result.shapes[0].attributes.title).to.be.equal(data.project.fields.title.nl);
        expect(result.shapes[0].attributes).to.have.property("intro");
        expect(result.shapes[0].attributes.intro).to.be.equal(data.project.fields.intro.nl);
        expect(result.shapes[0].attributes).to.have.property("created");
        expect(result.shapes[0].attributes.created).to.be.equal(data.project.meta.created);
        expect(result.shapes[0].attributes).to.have.property("lastModified");
        expect(result.shapes[0].attributes.lastModified).to.be.equal(data.project.meta.lastModified);
        expect(result.shapes[0].attributes).to.have.property("Link");
        expect(result.shapes[0].attributes.Link).to.be.equal("/projecten/" + data.project.meta.slug.nl);
        expect(result.shapes[0].attributes).to.not.have.property("ObjectId");

        done();
    });

    it("Map attributes for new items", function(done) {
        var data = {
            project: {
                uuid: "abc",
                meta: {
                    lastModified: "lastModified",
                    created: "created",
                    slug: {
                        nl: "slug"
                    }
                },
                fields: {
                    title: {
                        nl: "Title"
                    },
                    intro: {
                        nl: "Intro"
                    }
                }
            },
            shapes: [{
                ref: {
                    arcgisRef: "123"
                }
            }]
        };
        var result = MapHelper.attributes(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("project");
        expect(result).to.have.property("shapes");
        expect(result.shapes).to.have.lengthOf(data.shapes.length);
        expect(result.shapes[0]).to.have.property("attributes");
        expect(result.shapes[0].attributes).to.be.an("object");
        expect(result.shapes[0].attributes).to.have.property("uuid");
        expect(result.shapes[0].attributes.uuid).to.be.equal(data.project.uuid);
        expect(result.shapes[0].attributes).to.have.property("title");
        expect(result.shapes[0].attributes.title).to.be.equal(data.project.fields.title.nl);
        expect(result.shapes[0].attributes).to.have.property("intro");
        expect(result.shapes[0].attributes.intro).to.be.equal(data.project.fields.intro.nl);
        expect(result.shapes[0].attributes).to.have.property("created");
        expect(result.shapes[0].attributes.created).to.be.equal(data.project.meta.created);
        expect(result.shapes[0].attributes).to.have.property("lastModified");
        expect(result.shapes[0].attributes.lastModified).to.be.equal(data.project.meta.lastModified);
        expect(result.shapes[0].attributes).to.have.property("Link");
        expect(result.shapes[0].attributes.Link).to.be.equal("/projecten/" + data.project.meta.slug.nl);
        expect(result.shapes[0].attributes).to.have.property("ObjectId");
        expect(result.shapes[0].attributes.ObjectId).to.be.a.number;
        expect(result.shapes[0].attributes.ObjectId).to.be.equal(parseInt(data.shapes[0].ref.arcgisRef));

        done();
    });
});
