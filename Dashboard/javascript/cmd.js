//var $ = require("jquery");
var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
var appointments;
var app;
function gotoAppointment(){
  window.location.href="../../Appointment CMD/test/index.html";
}
var operations= {
getPatientCardInfo: function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    // deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
    $.get(url + "patientDb.json", function (data, status) {       
    }).then((res) => {
      if (res) {
        // deepcode ignore NonLocalLoopVar: <please specify a reason of ignoring this>
        for(var k in res)
        resolve({ status: 200, output: res[k].pId });
        var output = JSON.parse(JSON.stringify(res));
            getAppointments();
            for (var i in output) {
              for(var j in appointments){
                if(appointments[j].patientId === output[i].pId){
                  console.log(appointments[j].audioInfo);
                app= `                 
                <div class="col-12 col-sm-12 col-md-6 col-lg-3">                     
                          <div class="card">
                           
                                <div class="row">
                                    <div class="col-4">
                                          <img src="${output[i]['pUrl']}" style="width: 50px;padding-left: 5px;padding-top: 5px;" loading="lazy" class="card-img-top" alt="...">
                                          
                                    </div>
                                          
                                    <div class="col-8">
                                        <div class="row">
                                           <label class="name" style="font-weight: bold;color:rgb(20, 42, 83);padding-top: 10px;">${output[i]['pName']}(${output[i]['pAge']})</label>
                                              </div>
                                                <div class="row" style="padding-top: 10px;">
                                                <div class="col-4">
                                                  <a href="#"><i class="fas fa-comment-alt"></i></i></a>
                                                </div>
                                                <div class="col-4">
                                                  <a href="#"><i class="fas fa-phone-square"></i></a>
                                                </div>
                                                <div class="col-4">
                                                  <a href=""><i class="fas fa-video"></i></a>
                                                </div>
                                                 
                                                </div>
                                          </div>
                                    </div>
                                  
                                    <hr style="width:100%; margin-top: 7px;color: rgb(158, 156, 156);">
                                    
                                            <div  class="row">
                                              <div class="col-6">
                                                <b class="time" style="padding-left: 15px;">${appointments[j].timeSlot}</b>
                                              </div>
                                              <div class="col-6" style="border-left: 3px bold rgb(207, 207, 207); height: 28px;border-width: thin;">
                                                <label class="injury">${output[i].pActiveIssues}</label>
                                              </div>
                                            </div>
                                            <hr style="width:100%; margin-top: 4px;color: rgb(158, 156, 156);">
                                            <div  class="row">
                                                <span id="getViewDetails" class="bottom"><a style="font-size: 11px;padding-left: 12px;" id="${appointments[j].appointmentId}" href="#">viewDetails</a><a class="feedback" href="#">Given Feedback</a></span>
                                            </div>
                                </div>
                            </div>            
        `
              
              document.getElementById('card8').innerHTML+=app;
              getCounts();
              }
          
        }
        
        }
      } else {
        reject({ status: 404 });
      }
    });
  }, 300);
   });
    }
  };
  

operations.getPatientCardInfo();
$('body').on('click', '#getViewDetails', function (e) {
  var row  = $(this)[0].firstElementChild.id;

window.location.href="../../viewDetails/view details/Tamplate/Apg.html?text1="+row;

});

function getAppointments(){
  $.get(url + "appointmentDb.json", function (data, status) {
    var output1 = JSON.parse(JSON.stringify(data));
    appointments=output1;
    for (var i in output1) {
      var doctors= document.getElementById("doctor");
      doctors.textContent= `${output1[i].DoctorName}`;
  
    for (var key in output1[i]) {

    }
    
}
});
}
getAppointments();

function getCounts(){
  let count=0;let count1=0; let count2=0;
  for(var i in appointments){
    if(appointments[i].status==="Pending"){
        count++;

    }
    document.getElementById("numbers1").textContent=count;
    if(appointments[i].status==="Approved"){
      count1++;
    }
    document.getElementById("numbers").textContent=count1;
    if(appointments[i].status==="Rejected"){
      count2++;
    }
    document.getElementById("numbers2").textContent=count2;
  }
  
}

function sound(){
  $.get(url + "doctorDb.json", function (data, status) {

    var sound1 = JSON.parse(JSON.stringify(data));
    for(var m in sound1){
      sound2=`
      <audio id="myAudio">
      <source
      src="${sound1[m].appointmentInfo}"
      type="audio/wav"
      />
      Your browser does not support the audio element.
      </audio>
      `
      document.getElementById('noise').innerHTML=sound2;
    console.log(sound1[m].appointmentInfo);

    }
    document.getElementById('myAudio').play();
    
  });
}

//module.exports=operations;

const numSteps = 20.0;

let boxElement;
let prevRatio = 0.0;
let increasingColor = "white";
let decreasingColor = "rgba(190, 40, 40, ratio)";

// Set things up
window.addEventListener("load", (event) => {
  boxElement = document.querySelector("#lazyload");

  createObserver();
}, false);

function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    prevRatio = entry.intersectionRatio;
  });
}





