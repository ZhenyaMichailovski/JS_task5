const mocha = require('mocha');
//const app = require("C:\\РПИ\\Lab5\\Task2\\Task2.js");
const operations = require("./operations.js");
 
mocha.it("should multiply two numbers", function(){
     
    let expectedResult = 15;
    let result = operations.multiply(3, 5);
    if(result !== expectedResult) {
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

// describe("Test the root path", () => {
//     mocha.it("It should response the GET method", done => {
//     request(app)
//       .get("/")
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });