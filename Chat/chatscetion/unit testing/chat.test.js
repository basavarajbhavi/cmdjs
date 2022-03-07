const getDoctor= require('../javascript/chat');

var $ = require("jquery");



describe("Operator Tests", () => {

  test("checking doctor", async () => {

    const apiCall =getDoctor();

    return apiCall.then((response) => {
      // console.log(response)
    expect(response.status).toBe(200);

    });

    });
    // test("checking doctor name", async () => {

     //  const apiCall =getDoctor();
      
      // return apiCall.then((response) => {
     
      // expect(response.output).toBe('Dr. Derek Williams');
  
    //  });
  
      // });
  });

 

