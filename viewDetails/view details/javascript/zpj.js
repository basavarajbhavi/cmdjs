//const { resolve } = require("path/posix");
// var $ = require("jquery");
// const Module = require("module");
//const { setTimeout } = require("timers/promises");
var completeSound = document.getElementById("myAudio");
// getPrescription().then((res) => {
//     console.log("Get: ", res.output);

//   });
function getDoctor() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
                $.get(url + `doctorDb.json`, function (data, status) {
              console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

            }).then((res) => {
                   if (res) {
 resolve({ status: 200, output: res });

                    for (var i in res) {
                   var result = `  
                 <option>${res[i].Name}</option>

                `
document.getElementById('patient-issue-list').innerHTML = result;

                    }

                } else {

                    reject({ status: 404 });

                }

            });

        }, 300);

    });

}

var a=document.getElementById('patientTestList');
function getTests() {
// a.innerHTML=" ";
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
                $.get(url + `testDb.json`, function (data, status) {
              console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

            }).then((res) => {
                   if (res) {
 resolve({ status: 200, output: res });
 a.innerHTML="";
                    for (var i in res) {
                       
                   var result = `  
                 <option>${res[i].Name}</option>

                `;

                a.innerHTML+=result;

                    }

                } else {

                    reject({ status: 404 });

                }

            });

        }, 300);

    });

}

document.getElementById("searchdoctorname1").style.visibility="hidden";
document.getElementById("patient-test-listitem1").style.visibility="hidden";   
document.getElementById("patient-test-listitem2").style.visibility="hidden";   
document.getElementById("patient-test-listitem3").style.visibility="hidden";   
document.getElementById("patient-test-listitem4").style.visibility="hidden";   
document.getElementById("patient-test-listitem5").style.visibility="hidden"; 
  $(document).ready(function () {
   $('#patient-issue-list').click(function () {
  
         var inputsearch = document.querySelector("#patient-issue-list").value;
         console.log(inputsearch);
         if (inputsearch == "Dr. Derek Williams") {
            document.getElementById("searchdoctorname1").innerHTML = inputsearch+`<i style="float:right;color:red ;margin:3px;" class="fas fa-xmark">X</i>` ;
            
         }
         document.getElementById("searchdoctorname1").style.visibility="visible";
       
    });
   
    $('#searchdoctorname1').click(function () {
    
    
        //   document.getElementById("searchdoctorname1").innerText = inputsearch;
           document.getElementById("searchdoctorname1").style.visibility="hidden";
      
   });

    $('#patientTestList').click(function () {
         var testInputSearch = document.querySelector("#patientTestList").value;
         console.log(testInputSearch);

       if (testInputSearch ==="MRI") {
        document.getElementById("patient-test-listitem1").style.visibility="visible";
            document.getElementById("patient-test-listitem1").innerHTML = testInputSearch+`<i style="float:right;margin:3px; color:red" class="fas fa-xmark">X</i>` ;
        } else if (testInputSearch == "CT Scan") {
            document.getElementById("patient-test-listitem2").style.visibility="visible";
            document.getElementById("patient-test-listitem2").innerHTML = testInputSearch+`<i style="float:right;margin:3px; color:red" class="fas fa-xmark">X</i>`  ;
       } else if (testInputSearch == "Urine Test") {
        document.getElementById("patient-test-listitem3").style.visibility="visible";
           document.getElementById("patient-test-listitem3").innerHTML= testInputSearch+`<i style="float:right;margin:3px;color:red" class="fas fa-xmark">X</i>`  ;
        }else if (testInputSearch == "Blood Test") {
            document.getElementById("patient-test-listitem4").style.visibility="visible";
            document.getElementById("patient-test-listitem4").innerHTML = testInputSearch+`<i style="float:right;margin:3px;color:red" class="fas fa-xmark">X</i>`  ;
       } else if (testInputSearch == "Blood Sugar") {
        document.getElementById("patient-test-listitem5").style.visibility="visible";
           document.getElementById("patient-test-listitem5").innerHTML = testInputSearch+`<i style="float:right;margin:3px;color:red" class="fas fa-xmark">X</i>`  ;
        }
        //
        
       

    });
    $('#patient-test-listitem1').click(function () {
      //   document.getElementById("searchdoctorname1").innerText = inputsearch;
        document.getElementById("patient-test-listitem1").style.visibility="hidden";      
    });
    $('#patient-test-listitem2').click(function () {
        //   document.getElementById("searchdoctorname1").innerText = inputsearch;
          document.getElementById("patient-test-listitem2").style.visibility="hidden";      
      });
      $('#patient-test-listitem3').click(function () {
        //   document.getElementById("searchdoctorname1").innerText = inputsearch;
          document.getElementById("patient-test-listitem3").style.visibility="hidden";      
      });
      $('#patient-test-listitem4').click(function () {
        //   document.getElementById("searchdoctorname1").innerText = inputsearch;
          document.getElementById("patient-test-listitem4").style.visibility="hidden";      
      });
      $('#patient-test-listitem5').click(function () {
        //   document.getElementById("searchdoctorname1").innerText = inputsearch;
          document.getElementById("patient-test-listitem5").style.visibility="hidden";      
      });
 });

$(document).ready(function () {
    $('#patient-issue-list').click(function () {
        var inputsearch = document.querySelector("#patient-issue-list");
        console.log("search", inputsearch.value)
        // document.getElementById("searchdoctorname").value = inputsearch.value;
        //  document.getElementById("searchinput").textContent=inputsearch;

    });
    function changeDrpDwnVal() {
        var patientLstItm = document.getElementById("patient-issue-list").value;
        console.log(patientLstItm);
        // if(patientLstItm == "Doctor"){
        //     document.getElementById("searchdoctorname0").value = "Doctor";
        // } else if(patientLstItm == "Dr.Sammy Winchester"){
        //     document.getElementById("searchdoctorname1").value = "Dr.Sammy Winchester";
        // } else if(patientLstItm == "Cardiologist"){
        //     document.getElementById("searchdoctorname2").value = "Cardiologist";
        // }
    }

    $('#patient-issue-list').click(function () {
        document.getElementById("searchdoctorname0").value = "Dr.Susan Light";

    });
});
$(document).ready(function () {
    $('#patient-issue-list123').click(function () {
        // var inputsearch = document.querySelector("#patient-issue-list1");
        // console.log("search", inputsearch.value)
        // document.getElementById("searchinput1").value = inputsearch.value;
        //  document.getElementById("searchinput").textContent=inputsearch;

    });
});

// $(document).ready(function () {
//     $('#patient-issue-list1').click(function () {
//         var inputsearch = document.querySelector("#patient-issue-list1").value;
//         console.log(inputsearch);
//         if(inputsearch == "ECG"){
//             document.getElementById("searchdoctorname3").value = inputsearch;
//         } else if(inputsearch == "Dr.Thomas Wayner"){
//             document.getElementById("searchdoctorname4").value = inputsearch;
//         } else if(inputsearch == "Dr.Roger Brookes"){
//             document.getElementById("searchdoctorname5").value = inputsearch;
//         }

//     });
// });

// $(document).ready(function () {
$('#patient-issue-list1').click(function () {
    var inputsearch = document.querySelector("#patient-issue-list1");
    console.log("search", inputsearch.value)
    // document.getElementById("searchdoctorname").value = inputsearch.value;
    //  document.getElementById("searchinput").textContent=inputsearch;

});
function changeDrpDwnVal() {
    var patientLstItm = document.getElementById("patient-issue-list1").value;
    console.log(patientLstItm);
    // if(patientLstItm == "Doctor"){
    //     document.getElementById("searchdoctorname0").value = "Doctor";
    // } else if(patientLstItm == "Dr.Sammy Winchester"){
    //     document.getElementById("searchdoctorname1").value = "Dr.Sammy Winchester";
    // } else if(patientLstItm == "Cardiologist"){
    //     document.getElementById("searchdoctorname2").value = "Cardiologist";
    // }
}

$('#patient-issue-list1').click(function () {
    document.getElementById("searchdoctorname3").value = "";

});
// });
// $(document).ready(function () {
//     $('#patient-issue-list123').click(function () {
//         // var inputsearch = document.querySelector("#patient-issue-list1");
//         // console.log("search", inputsearch.value)
//         // document.getElementById("searchinput1").value = inputsearch.value;
//         //  document.getElementById("searchinput").textContent=inputsearch;

//     });
// });
function getPrescription() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
            $.get(url + `prescriptionDb.json`, function (data, status) {
                console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            }).then((res) => {
                if (res) {
                    resolve({ status: 200, output: res });
                    for (var i in res) {
                        var result = ` <div class="card p-2 m-2 ">
                <div class="d-flex justify-content-between">
                <div>
                    <ol type="1">
                        <li>Paracitmal</li>
                        <p style="opacity: 0.5; font-size: 11px;">${res[i].comment
                            }
                          
                        </p>
            
                    </ol>
            
                </div>
                <div>
                    <div style="margin-left: 50px;">
                        <i style="color: rgb(149, 149, 199); " class="far fa-pen"></i>
                        <span style="color:red;">X</span>
                    </div>
                    <p
                        style=" text-align: center; background-color: rgb(35, 35, 102);padding: 3px;border-radius: 5px; color: white; font-size: 10px;">
                        After Food</p>
                </div>
            </div>
            </div>`
                        document.getElementById("getPrescription").innerHTML += result
                    }
                } else {
                    reject({ status: 404 });
                }
            });
        }, 300);
    });
}
//getPrescription();

// function getP
function getPatientCardInfo() {

    clickOnViewDetails();

}

function clickOnViewDetails() {

    var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
    $.get(url + "appointmentDb.json", function (data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        var output = JSON.parse(JSON.stringify(data));
        console.log("Value: ", output);


        for (var i in output) {
            var doctors = document.getElementById("doctor");

            doctors.textContent = `${output[i].DoctorName}`;

            var appid = "app_12345";
            if (output[i].appointmentId === appid) {
                getPatientDetails();
                getDctorDetails();
                getVitals();


            }
        }

    });


}
function getPatientDetails() {
    return new Promise((resolve, reject) => {



        var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
        $.get(url + "patientDb.json", function (data, status) {
            //   console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);


        })
            .then((res) => {
                if (res) {
                    for (k in res)
                        resolve({ status: 200, output: res[k].pId });
                    var output1 = JSON.parse(JSON.stringify(res));
                    for (var j in output1) {
                        if (output1[j].pId === "pat_12345") {

                            var result =
                                ` 
                        <div  style="height: 170px;" class="card p-3">
        
        
        
        
                        <div id="rahul" class="row ">
                        <div class="col-3 ">
                        <img src="${output1[j].pUrl}" style="width: 50px; height: 50px; border-radius: 50%;" class="card-img-top "
                        alt="... ">
                        </div>
                        <div class="col-9 ">
                        <ul class="list-group ">
                        <span style="font-size: 15px;color:#18385c ; opacity: 0.7;">Patient</span>
                        <span class="peter" style="color:#18385c ;font-weight:bolder; font-size: 20px;">${output1[j].pName}</span>
                        <span style="color:#18385c ;font-weight:bold; font-size: 12px;">${output1[j].pGender},Age ${output1[j].pAge}</span>
                        </ul>
                        </div>
                        </div>
                        <div class="row ">
                        <div class="col border-end ">
                        <p>
                        <i style="opacity: 0.7;" class="fas fa-phone-alt "><span
                        style="color:#18385c ;  font-size: 14px;">${output1[j].pMobile}</span>
                        </i>
                        </p>
                        <p>
                        <i style="opacity: 0.7;" class="fas fa-envelope ">
                        <span style="color:#18385c; font-size: 14px;">${output1[j].pEmail}</span>
                        </i>
                        </p>
                        
                        </div>
                        <div class="col ">
                        <p>
                        <i style="opacity: 0.7;" class="far fa-calendar-alt ">
                        <span style="color:#18385c; font-size: 14px;">${output1[j].pDOB}</span>
                        </i>
                        </p>
                        
                        <p>
                        <i style="opacity: 0.7;" class="fas fa-tint ">
                        <span style="color:#18385c; font-size: 14px;">${output1[j].pBloodGroup}</span>
                        </i>
                        </p>
                        
                        
                        </div>
                        </div>
                        
                        </div>
                     `;

                        }

                    }
                    document.getElementById('getpatientcard').innerHTML += result;

                } else {
                    reject({ status: 404 })
                }

            });

    });
}
//getPatientDetails();
var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
function getDctorDetails() {
    var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
    $.get(url + "doctorDb.json", function (data, status) {
        // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        var output = JSON.parse(JSON.stringify(data));

        for (var i in output) {

            var did = "doc_12345";
            if (output[i].doctorId === did) {
                var result =
                    `
                            <div style="height: 170px;" class="card p-3">
                            <div class="row ">
                                <div class="col-3 ">
                                    <img src="${output[i].ProfileUrl}" style="width: 50px; height: 50px; border-radius: 50%;"  class="card-img-top " alt="... ">
                                </div>
                                <div class="col-8 ">
                                    <ul class="list-group ">
                                        <span style="font-size: 15px;color:#18385c ; opacity: 0.7;">Doctor</span>
                                        <span style="color:#18385c ;font-weight:bolder; font-size: 20px;">${output[i].Name}</span>
                                        <span style="color:#18385c ;font-weight:bolder; font-size: 12px;">${output[i].Specialization}</span>
                                    </ul>
                                </div>
                                <div class="col-1">
                                <i id="noise" class="far fa-volume m-1" onclick="sound()"></i>
                                </div>

                            </div>
                            <div class="row ">
                                <div class="col border-end">
                                    <p> <i style="opacity: 0.7;" class="fas fa-phone-alt ">
                                            <span style="color:#18385c; font-size: 14px;">${output[i].Mobile}</span>
                                        </i></p>
                                    <p><i style="opacity: 0.6;" class="fas fa-envelope ">
                                            <span
                                                style="color:#18385c ; font-size: 14px;">${output[i].Email}</span>
                                        </i></p>

                                </div>

                                <div class="col ">
                                    <ul class="list-group ">
                                        <span style="font-size: 11px; opacity: 0.6;">NPI NO</span>
                                        <span style="color:#18385c;color:#18385c; font-size: 14px;">${output[i].NPI}</span>
                                        <span style="font-size: 12px;color:#18385c; opacity: 0.7;">practiceLocation</span>
                                        <span style="color:#18385c; font-size: 14px;">${output[i].practiseLocation},India</span>
                                    </ul>


                                </div>
                            </div>



                        </div>
                            `

            }
            document.getElementById('getdoctorcard').innerHTML = result;
        }

    });
}
function sound(){



    $.get(url + "doctorDb.json", function (data, status) {
    
    
    
    //console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    
    
    
    var sound1 = JSON.parse(JSON.stringify(data));
    
    
    
    for(var m in sound1){
    
    
    
    var sound2=`
    <audio id="myAudio1">
    <source
    src="${sound1[m].audioInfo}"
    type="audio/wav"
    />
    Your browser does not support the audio element.
    </audio>
    `
    document.getElementById('noise').innerHTML=sound2;
    // console.log(sound1[m].patientInfo);
    
    
    
    document.getElementById('myAudio1').play();
    }
    
    
    
    });
    
    
    
    }

function getVitals() {
    var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
    $.get(url + "patientDb.json", function (data, status) {
        // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        var output = JSON.parse(JSON.stringify(data));
        //    console.log("Value: ", output);


        for (var i in output) {

            var pid = "pat_12345";
            if (output[i].pId === pid) {
                var result =
                    `
                            <!-- 1st symbol -->
                            <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                                <div style="font-size: 12px; color: rgb(82, 82, 126); font-size: 12px;">ECG
                                </div>
                                <i style="color: red; font-size: x-large;margin: 5px;" class="far fa-heart"></i>

                                <div>
                                    <span>${output[i].pECG}</span><span style="opacity: 0.6; font-size: 12px;color:#18385c;"> BPM</span>
                                    <hr style="width: 40% ;margin:10px; text-align: right;">
                                </div>

                            </div>
                            <!-- second -->
                            <div class="col-6 col-sm-6 col-md-3 col-lg-3">

                                <div style="font-size: 12px;">Temparature</div>
                                <i style="color: rgb(40, 36, 100); font-size: x-large; margin: 5px;"
                                    class="fas fa-temperature-low"></i>
                                <div>
                                    <span>${output[i].pTemperature} </span><span style="opacity: 0.6;color:#18385c; font-size: 12px;"> &#176 C</span>
                                    <hr
                                        style="width:  40% ; margin:10px; color: rgb(35, 35, 102); text-align: right;">
                                </div>

                            </div>
                            <!-- third -->
                            <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                                <div style="font-size: 12px;">Diabetes</div>
                                <i style="color: rgb(40, 36, 100); font-size: x-large; margin: 5px;"
                                    class="fas fa-prescription-bottle"></i>

                                <div>
                                    <span>${output[i].pDiabetes} </span><span style="opacity: 0.6;color:#18385c;  font-size: 12px;"> mg/dl</span>
                                    <hr style="width: 40% ;margin:10px; text-align: right;">
                                </div>

                            </div>
                            <!-- fourth -->
                            <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                                <div style="font-size: 12px;">Respiration Rate</div>
                                <i style="color: rgb(40, 36, 100); font-size: x-large; margin: 5px;"
                                    class="fas fa-lungs"></i>

                                <div>
                                    <span>${output[i].pRespiration}</span><span style="opacity: 0.6;color:#18385c;  font-size: 12px;"> BPM</span>
                                    <hr style="width: 40% ;margin:10px; text-align: right;">
                                </div>

                            </div>
                            `

            }
            document.getElementById('vitals').innerHTML = result;
        }

    });

}


function getComment() {
    var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
    $.get(url + "prescriptionDb.json", function (data, status) {
        // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        var priscription = JSON.parse(JSON.stringify(data));

        for (var i in priscription) {
            var pid = "pre_12345";
            console.log('pid')
            if (priscription[i].PrescriptionId === pid) {
                console.log("come")

                var result11 =
                    `
            <span style="color:#18385c;">${priscription[i].comment}</span>
            `;

            }
            document.getElementById('getcomm').innerHTML = result11;

        }
    });



}
getComment();
getPatientCardInfo();



var searchForMad = document.getElementById('recipient-name');
var searchForDuration = document.getElementById('recipient-name1');
var searchForMadCycle = document.getElementById('recipient-name2');
var afterFood = document.getElementById('flexSwitchCheckDefault');
var Discription = document.getElementById('recipient-name3');
var addPrescriptionbutton = document.getElementById('addPrescription');

function getFood() {
    var checkbox = document.getElementById('flexSwitchCheckDefault');
    if (checkbox.checked == true) {
        console.log("...........................................come");
        return "AfterFood";

    } else {
        console.log("==================not come");
        return "BeforeFood";
    }

}

addPrescriptionbutton.addEventListener('click', function () {


    var prescriptionBody = {
        searchForMad: searchForMad.value,
        searchForDuration: searchForDuration.value,
        searchForMadCycle: searchForMadCycle.value,
        afterFood: getFood.call(),
        Discription: Discription.value,

    };

    //method call:


    setPrescription(prescriptionBody).then((res) => {
        console.log("Store: ", res.output);
    });



    //methods:


    function setPrescription(body) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
                $.post(
                    url + `addPrescriptionDb.json`,
                    JSON.stringify(body),
                    function (data, status) {
                        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
                    }
                ).then((res) => {
                    if (res) {
                        resolve({ status: 200, output: res });
                    } else {
                        reject({ status: 404 });
                    }
                });
            }, 300);
        });
    }
});
getPrescription().then((res) => {
    console.log("Get: ", res.output);
});
function getPrescription() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";

            $.get(url + `addPrescriptionDb.json`, function (data, status) {
                console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            }).then((res) => {
                if (res) {
                    resolve({ status: 200, output: res });
                    for (var i in res) {
                        var getdata = ` <div class="card p-2 m-2">
           <div class="d-flex justify-content-between">
          <div>
              <ol type="1">
                  <li>${res[i].searchForMad}</li>
                  <p style="opacity: 0.5; font-size: 11px;">${res[i].Discription}
                  </p>

              </ol>
      
          </div>
          <div>
              <div style="margin-left: 50px;">
                  <i style="color: rgb(149, 149, 199); " class="far fa-pen"></i>
                  <span style="color:red;">X</span>
              </div>
              <p
                  style=" text-align: center; background-color: rgb(35, 35, 102);padding: 3px;border-radius: 5px; color: white; font-size: 10px;">
                  ${res[i].afterFood}</p>
          </div>
      </div>
      </div> `;
                        document.getElementById('addPrescriptionDetails').innerHTML += getdata;

                    }
                } else {
                    reject({ status: 404 });
                }
            });
        }, 300);
    });
}
function playSound() {
    completeSound.play();//completeSound.pause();
}

//   sound.pause();
//    sound.currentTime = 0;
// module.exports = getPatientDetails;
