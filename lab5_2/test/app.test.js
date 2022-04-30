const request = require("supertest");
const app = require("../index.js");

describe("GET /ebooks", () => {
    it("should return all ebooks", (done) => {
        request(app)
            .get("/ebooks")
            .expect("Content-Type", /json/)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

describe("POST ebooks/", () => {
    it("should create a new ebook", (done) => {
        request(app)
            .post("/ebooks")
            .send({
                id: 1,
                screenSize: '1920x1080',
                screenResolution: '4k',
                screenType: 'LED',
                flashMemory: '512'
            })
            .expect('"Data has been added."')
            .end((err, res) => {
                console.log(res.body);
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe("GET ebooks/:id", () => {
    it("should return a single ebook", (done) => {
        request(app)
            .get("/ebooks/1")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe("PUT ebooks/", () => {
    it("should update a single ebook", (done) => {
        request(app)
            .put("/ebooks")
            .send({
                id: 1,
                screenSize: '1920x1080',
                screenResolution: '2k',
                screenType: 'LED',
                flashMemory: '1024'
            })
            .expect('"Data has been updated."')
            .end((err, res) => {
                console.log(res.body);
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});