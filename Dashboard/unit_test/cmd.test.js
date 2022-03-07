const operations = require('../javascript/cmd');
var $ = require("jquery");

describe("Operation Tests", () => {

  test("checking patient", async () => {
    const apiCall = operations.getPatientCardInfo();
    return apiCall.then((response) => {
    expect(response.status).toBe(200);
    });
    });

    test("checking id", async () => {
        const apiCall = operations.getPatientCardInfo();
        return apiCall.then((response) => {
           // console.log(response);
        expect(response.output).toBe('pat_12345');
        });
        });
    
});
