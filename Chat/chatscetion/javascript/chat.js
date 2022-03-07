//var $ = require("jquery");
var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
var chat1;
var doctor;

  function getDoctor  () {
  return new Promise((resolve, reject) => {
   setTimeout(() => {
  $.get(url + "doctorDb.json", function (data, status) {
    // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    var output = JSON.parse(JSON.stringify(data));
    
  }).then((res) => {                                                                 
   
    if (res) {
      for(j in res)
    resolve({ status: 200, output: res[j].Name});
    var output = JSON.parse(JSON.stringify(res));
    for (var i in output) {
      var navigation = document.getElementById("navdoc");
      navigation.innerText =`${output[i].Name}`;
      var navigationimg = document.getElementById("navimg");
      navigationimg.src =`${output[i].ProfileUrl}`;
      doctor =
        ` <div class="col-3">

                <img class="img1"
                  src="${output[i]["ProfileUrl"]}"
                  style="height: 50px;width: 50px;border-radius: 50%;display: inline-block;">

              </div>
              <div class="col-5">
                <div class="row">
                  <span style="font-weight:bold; color:#344B39 ; opacity: 0.5; font-size:12px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> ${output[i]["Name"]} </span>
                </div>
                <div class="row">
                  <span  style="font-size:10px; color:#344B39 ; font-family: italic;"> 
                    <div class="dropdown">
                      <span style="font-size:9px;" class="btn  dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        Available
                      </span>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </div> </span>
                </div>


              </div>
              <div class="col-2">
                <i class="fas fa-comment-alt-lines" style="color: #31344B ; padding-top:5px;"></i>
              </div>

              <div class="col-2">
                <i class="fas fa-ellipsis-v" style="color: #31344B ; padding-top:5px;"></i>
              </div>
              <hr style="margin: 0px; width:100%">`;

      // file deepcode ignore DOMXSS: <please specify a reason of ignoring this>
      // deepcode ignore DOMXSS: <please specify a reason of ignoring this>
      document.getElementById('doctor').innerHTML = doctor;
     
    
    }
    } else {
    reject({ status: 404 });
    }
    });
    }, 300);
    });
    }

  getDoctor();
  


// var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
var patientObj = {};
var name;
var completeSound = document.getElementById("myAudio");
function getPatientCardInfo() {
  $.get(url + "patientDb.json",  function (data, status) {
    // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    var output = JSON.parse(JSON.stringify(data));
    for (var i in output) {
       patientObj = output[i];
       var chat = `
            <div class="mychatlist">
            <div class="row">
            <div id="getPatientChat" class="col-3">
            <img  id=${output[i].pId} class="img1" onclick="playSound()" src="${output[i]["pUrl"]}"
            style="height: 50px;width: 50px;border-radius: 50%;display: inline-block;">
            </div>
            
            <div class="col-5">
            <div class="row">
          
            <span id="pNameChat" style="font-weight:bold; color:#344B39 ; font-size:12px; font-family: Times New Roman;" > ${output[i]["pName"]}
            </span>
            </div>
            <div class="row">
            <span style="font-size:10px; color:#344B39 ; font-family: italic;"> Last seen at 21:35 </span>
            </div>



            </div>
            <div class="col-1">
            <i class="fas fa-phone-alt" style="color: #31344B ;"></i>
            </div>
            <div class="col-1 mycontent">
            <i class="fas fa-video" style="color: #31344B ;"></i>
            </div>



            <div class="col-1">
            <i class="fas fa-ellipsis-v" style="color: #31344B ;"></i>
            </div>

            <hr style="margin-top: 3px; width:100%"> 
            </div>
            </div>`;
            
      // console.log(patientObj.pId);
      document.getElementById("row1").innerHTML += chat;
   
   }
  });
}
$('body').on('click', '#getPatientChat', function (e) {
  var row  = $(this)[0].firstElementChild.id;
  console.log(row);
//  document.getElementById('pNameChat').addEventListener('click', () => {
    var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
     $.get(url + "patientDb.json", function (data, status) {
      // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
      var output1 = JSON.parse(JSON.stringify(data));
      getMessage();
;

      for (var j in output1) {
        var pid = "pat_12345";
        // console.log(output1[j].pId);
       for(var k in chat1){

       
        if (output1[j].pId === row) {
         var result =
            `<div class="container-fluid" id="headcontainer">
             <div class="row" id="headrow">
                <div class="col-4 col-sm-4 col-md-4 col-lg-2" id="url">
                    <img style="width: 30px; height: 30px; border-radius: 50%;" src="${output1[j].pUrl}">
                </div>
    
                <div class="col-8 col-sm-8 col-md-8 col-lg-4" id="urlname">
                    <b>${output1[j].pName}</b><br>
                    <span>Last seen at 21:35</span>
                </div>
    
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-2"
                    style="display:flex;justify-content:space-around; overflow:hidden" id="icons">
                    <span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="padding-bottom:5px;"
                            fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                            <path
                                d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                            <path
                                d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg></span>
                    <span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="padding-bottom:5px;"
                            fill="currentColor" class="bi bi-file-earmark-fill" viewBox="0 0 16 16">
                            <path
                                d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
                        </svg></span>
                    <span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="padding-bottom:5px;"
                            fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg></span>
                    <span> <i class="far fa-video" style="font-size:25px; color: black;"></i>&nbsp;&nbsp;</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" style="padding-bottom:5px;"
                            fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg></span>
                </div>
    
            </div>
    
            <hr style="width:100%;">
    


            <div class="row">
<div class="col-12" id="hey">
   ${chat1[k].pMsg}
</div>
<br>
<div class="col-12" id="audio">
    <audio controls id="audiocontrol">
        <source id="audio2"
            src="${chat1[k].docAudio}"
            type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
</div>
</div>
            <div class="row" id="txtmsg">
        
                <span> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-paperclip" viewBox="0 0 16 16">
                        <path
                            d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                    </svg><input type="text" id="msg" placeholder="Type Something....."><svg xmlns="http://www.w3.org/2000/svg"
                        width="25" height="25" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                        <path
                            d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                    </svg></span>
        
            </div>
        </div>`; 
document.getElementById('chatContainer').innerHTML=result;
       }
       }
       }
    });
 


});
getPatientCardInfo();



function playSound() {
  completeSound.play();
  // completeSound.pause();
}
//getting chat
var chat;


function getMessage(){
   $.get(url + "chatDb.json", async function (data, status) {
   // console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
     chat = JSON.parse(JSON.stringify(data));
     chat1=chat;

    // console.log(chat1);
   });  
     for (var j in chat) {
            var pid = "pat_12345";
            // console.log(chat[j].pmsg);
     }
}
 getMessage();
//module.exports = getDoctor;

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
// search
function myFunction() {

var input, filter, cards, cardContainer, h5, title, i;

  input = document.getElementById("myFilter");//serch id myFilter

  filter = input.value.toUpperCase();

  cardContainer = document.getElementById("row1");//id of cahtcontainer

  cards = cardContainer.getElementsByClassName("mychatlist");

  for (i = 0; i < cards.length; i++) {

      title = cards[i].querySelector(".row span#pNameChat");

      if (title.innerText.toUpperCase().indexOf(filter) > -1) {

          cards[i].style.display = "";

      } else {

          cards[i].style.display = "none";

      }

  }

}