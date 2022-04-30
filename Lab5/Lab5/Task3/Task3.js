const request = require("supertest");
const app = require("C:\\РПИ\\Lab5\\Task2\\Task2.js");

describe("GET /orders", () => {
    it("should return all ordres", (done) => {
        request(app)
        .get("/orders")
        .expect("Content-Type", /json/)

        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });
});

describe("GET orders/:id", () => {
    it("should return a single order", (done) => {
        request(app)
        .get("/orders/1")
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

describe("POST orders/", () => {
    it("should create a new employee", (done) => {
        request(app)
        .post("/orders")
        .send({
            CustomerId: 1,
            OrderDate: "1997-11-05",
            RepairId: 1,
            TotalRepairCost: 1,
            Comment: "Good job."
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

describe("PUT orders/", () => {
    it("should update a single order", (done) => {
        request(app)
        .put("/orders")
        .send({
            Id: 12,
            CustomerId: 2,
            OrderDate: "1997-11-03",
            RepairId: 2,
            TotalRepairCost: 2,
            Comment: "Good job."
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