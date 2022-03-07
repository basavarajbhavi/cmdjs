
var table;
var cellReading;
var cellDoc;
var patientId;
var requiredPrescriptions = [];
var requiredAppointments =[];
var doctorsArray = [];
var medicinesArray =[];
        var searchForSymptoms ;
        var reading ;
        var searchDoctor;
       // import $ from 'jquery';
     // var $ =require('jquery');
        const symptomsList = [];
        var completeSound = document.getElementById("myAudio");
      
        $(document).ready(function(){
      
          patientId = document.URL.substring(document.URL.indexOf("=") + 1);
          console.log("sub",patientId);
        });
      
        
var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
$.get(url + `patientDb.json`, function (data, status) {
    var output = JSON.parse(JSON.stringify(data));
  console.log("Value: ", output);
  
    for (var i in output) {
   
    if (output[i].pId === patientId) {
    
    console.log(output[i]);

if(output[i].pGender =="F"){
  document.getElementById("gender").classList.remove('fa-mars');
  document.getElementById("gender").classList.add('fa-venus');

}
else{
 // if(document.getElementById("gender").className == 'fa-solid fa-venus'){
  document.getElementById("gender").classList.remove('fa-venus');
  //}
  document.getElementById("gender").classList.add('fa-mars');
}

document.getElementById('imageURl').src=output[i].pUrl;
//document.getElementById("imageURl").value=output[i].pUrl;
document.getElementById("name").textContent = output[i].pName;
document.getElementById("age").textContent = output[i].pAge;
document.getElementById("bloodgrp").textContent = output[i].pBloodGroup;
document.getElementById("dob").textContent =output[i].pDOB;
document.getElementById("height").textContent = output[i].pHeight;
document.getElementById("allergies").textContent = output[i].pAllergies;
document.getElementById("mobile").textContent = output[i].pMobile;
document.getElementById("medicalPrb").textContent = output[i].pMedicalProblems;
document.getElementById("activeIssue").textContent = output[i].pActiveIssues;
document.getElementById('myAudio').src=output[i].audioInfo;
 getAllDoctor().then((res) => {
 // console.log("Get: ", res.output);
 var allDoctors = JSON.parse(JSON.stringify(res.output));
         
          console.log("doctor: ", allDoctors);
          
           for (var j in allDoctors) {
           
           const doctorObject = {
             Id:allDoctors[j].doctorId,
             specialization: allDoctors[j].Specialization,
             doctorName: allDoctors[j].Name,
             url:allDoctors[j].ProfileUrl,
           };
           console.log("doctorList",doctorObject);
           doctorsArray.push(doctorObject);
           
          
       }
       //console.log("doc",doctorsArray)
       document.getElementById('docImageId').src=doctorsArray[0].url;
       document.getElementById("docID").textContent = doctorsArray[0].doctorName;
       getAppointmentByPatientId(patientId);
});
console.log("doc",doctorsArray)
getSymptomsData(patientId).then((res)=>{
  var allSymptoms; 
  allSymptoms = JSON.parse(JSON.stringify(res.output));
  console.log("Value: ", allSymptoms);
  
  getSymptomsList(allSymptoms,function(symptomsList,symptomsMap){
    console.log("map",symptomsMap);
    table = document.getElementById("SymptomList");
    //console.log("Value: ", symptomsList);
    // for (var i = 0; i < symptomsMap.length; i++) {
      symptomsMap.forEach(function(count, symptomName) {
      console.log("Value: ", count);
      //var name = symptomsList[i].symptomName;
     
     getIndexSymptoms(symptomName,symptomsList,function(index){
     console.log(index)
   getDoctorName(symptomsList[index].doctorId,function(docName){
     console.log("doctor",docName);
        var row = table.insertRow();
        row.setAttribute('class', 'tr1 parent SymptomcellRow');
        row.setAttribute('id', symptomsList[index].Id);
        row.style ="border-bottom: 1px solid #ccc;"
        console.log("dataid",row.getAttribute("id"));
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
      
        cell1.innerHTML = '<span id="symp_' + index + '" style="font-size:0.9em;">'+symptomsList[index].symptomName+'</span>';
      //document.getElementById('symp_' + i).style.fontSize="0.9em";
        cell2.innerHTML = '<span id="preShow" style="background-color:red;color:white;border-color:red;">'+count+'</span>';
        cell3.innerHTML = '<span style="color:black; font-size: 0.8em;padding-left: 30%;"id ="toggle_' + index + '" >Show</span> <span id="showID"><i class="fa fa-angle-down" id="showID_' + index + '"  style="font-size:0.6em; margin-top: 1%; color: gray;" aria-hidden="true"></i></spa>';
        //cell4.innerHTML = '  <i class="fas fa-pencil " style="color:#1e90ff;float:right;font-size:0.8em;"></i>';
       
        cell4.innerHTML = ' <span id=closeID><i class="fas fa-times    " style="color:red;font-size:0.8em;id="close_'+index+'"></i></span>';
       // console.log("row",row);
    var row1 =table.insertRow();
   row1.setAttribute('id',"row1"+ symptomsList[index].Id);
   console.log("row1",row.getAttribute("id"));
     row1.innerHTML = '<span id="symptom_' + index + '" style="display:none; margin-left:20px;font-size:0.7em;"> '+symptomsList[index].reading+'</span><div style="display:none;font-size:0.7em;color:#ccc;margin-left:20px;" id="name_'+index+'">'+docName+'</div>';
      console.log("row1",row1);
   
    });
   });
    });
 
  });

    
 
});



getMedicines().then((res) => {
  var output = JSON.parse(JSON.stringify(res.output));
  for (var j in output) {
    
    const medicineObject = {
      Id:output[j].Id,
      Name: output[j].Name,
      duration: output[j].Duration,
      medicineCycle:output[j].medicineCyle,
      food: output[j].food,
      description: output[j].Description,
    };
    //console.log("doctorList",medicineObject);
    medicinesArray.push(medicineObject);
    
    
    }
    getPrescriptionByPatientId(patientId);
});
    
    }
    
  
    }
    
  });
  function getIndexSymptoms(nameKey,symptomsList,CB){
    //   var count = 0;
    var index
    console.log("symptom",nameKey);
      for(var k=0; k<symptomsList.length;k++){
        
       // console.log("symptom",symptomsList[k].symptomName)
     if(nameKey == symptomsList[k].symptomName){
      console.log("symptommatch",symptomsList[k].symptomName)
     index = k;
   break;
    
     }
    }
    console.log("count",index);
    CB(index);
  
    }
  function getCountForSymptoms(nameKey,symptomsList,CB){
    var count = 0;
    //console.log("symptom",nameKey);
    for(var k=0; k<symptomsList.length;k++){
      
     // console.log("symptom",symptomsList[k].symptomName)
   if(nameKey == symptomsList[k].symptomName){
    console.log("symptommatch",symptomsList[k].symptomName)
   count = count+1;
 
  
   }
  // els
  // if(count > 1){
  //   symptomsList.splice(k,1);
  // }
    }
    //if(k == symptomsList.length-1){
      console.log("count",count);
      CB(count);
     //}
   
  }
  function getDoctorName(docId,cb){
    var docName;
     
    for(var j in doctorsArray){
      console.log("specialization",docId)
if(doctorsArray[j].Id == docId)
{
  console.log("specialization",doctorsArray) 
  docName =doctorsArray[j].doctorName;
  
}
if(j == doctorsArray.length-1)
{
  console.log("spec",docName);
  cb(docName);
}
}


  }
  function getSymptomsList(allSymptoms,cb){
    var symptomsMap = new Map();
    for (var j in allSymptoms) {
     // console.log("patientID",allSymptoms[j]);
      //var count = 0;
       if (allSymptoms[j].patientId === patientId) {
       
      
        // console.log("symptom",allSymptoms[j]);
         if(symptomsMap.has(allSymptoms[j].name)){
          //var count=symptomsMap.get(allSymptoms[j].name);
          symptomsMap.set(allSymptoms[j].name,symptomsMap.get(allSymptoms[j].name)+1);
         }
         else{
           symptomsMap.set(allSymptoms[j].name,1);
         }



         const symptomObject = {
           Id:allSymptoms[j].Id,
           symptomName: allSymptoms[j].name,
           reading: allSymptoms[j].reading,
           doctorId: allSymptoms[j].doctor,
          
         };
         symptomsList.push(symptomObject);
         //console.log("symptomsList",symptomsList);
      //  });
       }
      
      }  
      cb(symptomsList,symptomsMap);
  }
  $(document).ready(function(){
    $('#allDoctor').click(function(){
   
      var select = document.getElementById("allDoctor");
      console.log("option",$("#allDoctor option").length);
      if($("#allDoctor option").length == 1){
      for(var i = 0; i <doctorsArray.length; i++) {
        console.log("doctor",doctorsArray[i].doctorName);
          var option = document.createElement('option');
          option.text = option.value = doctorsArray[i].doctorName;
          select.add(option, 0);
      }
    }
    });
  });
    $(document).ready(function(){ $('#plusButton').click(function(){
     
        $('#Mymodal').modal('show')
      
$('#allDoctor').val(''); 

      });
    });
    function getDoctorID(searchDoctor,CB){
      var docId;
      for(k=0;k<doctorsArray.length;k++){
       // console.log(searchDoctor);
        if(searchDoctor == doctorsArray[k].doctorName){
           docId =doctorsArray[k].Id;
           console.log(docId);
           CB(docId)
        }

      }
     
    }
    $(document).ready(function(){ $('#addSymptom').click(function(){
      //var docId;
        // completeSound.play();
        searchForSymptoms = document.querySelector("#searchForSymptom");
        reading = document.querySelector("#reading");
        searchDoctor = document.querySelector("#allDoctor");
        console.log(searchDoctor.value);
        getDoctorID(searchDoctor.value,function(docId){
          console.log(docId);

          var body = {
          
            Id:Date.now() ,
            
            patientId: patientId,
           
            name: searchForSymptoms.value,
            reading: reading.value,
            doctor: docId,
            
            };
            var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
            console.log(body);
            $.post(
            
            url + "symptomsDb.json",
            
            JSON.stringify(body),
          
            function (data, status) {
            
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            
            }
           
            );
                });
        })
        
    });
    // async function getDoctorName(id) {

    //   var name = "";
    
    //   // file deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
    //   var doctors = await getAllDoctor().then((res) => {
    
    //     console.log("Response: ", res.output);
    
    //     return res.output;
    
    //   });
    
    //   console.log("All Doctor: ", doctors);
    // //let i;
    //   for (var i in doctors) {
    
    //     if (doctors[i].doctorId == id) {
    
    //       name = doctors[i].Name;
    
    //     }
    
    //   }
    
    //   return name;
    
    // }
    function getAllDoctor() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
      // GET request to doctors.json
      var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
      $.get(url + `doctorDb.json`, function (data, status) {
  //  console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
      }).then((res) => {
          if (res) {
          resolve({ status: 200, output: res });
          
          } else {
          reject({ status: 404 });
          }
          });
         
          }, 500);
          });
    
  }
  
    function getSymptomsData(pId){
      
     
      return new Promise((resolve, reject) => {
        setTimeout(() => {
      var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
      $.get(url + `symptomsDb.json`, function (data, status) {
  
      }).then((res) => {
          if (res) {
          resolve({ status: 200, output: res });
         
        }
        else{
          reject({ status: 404 });
        }
          
      });
        },500);

      
          });

    }
    function deleteSymptoms(id){
      $.ajax({
          url: 'https://cmd-ui-demo-default-rtdb.firebaseio.com/symptomsDb.json'+id,
          method: 'DELETE',
          success: function () {
              console.log('record has been deleted');
             // getAllBooks();
          },
          error: function (error) {
              alert(error);
          }
      })
  }
    $('body').on('click', '#closeID', function () {
      var row  = $(this).parents('tr');
      console.log("close",row[0].id);
    for(var i=0;i<symptomsList.length;i++){
      if(symptomsList[i].Id == row[0].id){
        symptomsList.splice(i, 1);
      row.remove();
      // deleteSymptoms(symptomsList[i].Id);
     console.log("hello");
      }
    }
      
    });
      
    $('body').on('click', '#showID', function () {
      
   
    var row  = $(this).parents('tr');
  
    for (var i = 0; i<symptomsList.length;i++) {
      
   
    if(symptomsList[i].Id == row[0].id )
    {
      document.getElementById(row[0].id).style.borderBottom="none";
   
      var x = document.getElementById("toggle_"+i);
      var y =  document.getElementById("showID_"+i);
    if (x.innerText === "Show") {
var a= document.getElementById("symptom_"+i).parentElement.id;
document.getElementById(a).style.borderBottom ="1px solid #ccc";
      document.getElementById("symp_"+i).style.fontSize = "1em";
      document.getElementById("symptom_"+i).style.display = "block";
    
      document.getElementById("name_"+i).style.display = "block"
     
        x.innerHTML = "Hide";
        y.classList.remove('fa-angle-down');
        y.classList.add("fa-angle-up");
 
       } else {
        document.getElementById("symp_"+i).style.fontSize = "0.9em";
         console.log("hide");
         document.getElementById("name_"+i).style.display = "none"
         document.getElementById("symptom_"+i).style.display = "none"
        
      console.log("hide");
        x.innerHTML = "Show";
        y.classList.remove('fa-angle-up');
        y.classList.add("fa-angle-down");
    
      }
     
  
   
    }
    
   
}
     
   
     

    
  });
  function getPrescriptionByPatientId(pId){
  
    $.get(url + `prescriptionDb.json`, function (data, status) {
    
    
        var prescriptionOutput = JSON.parse(JSON.stringify(data));
        
        for (var i in prescriptionOutput) {
        
        
        
          if (prescriptionOutput[i].patientId === pId) {
            requiredPrescriptions.push(prescriptionOutput[i])
           // requiredPrescriptions.push(prescriptionOutput[i])
            console.log(prescriptionOutput[i]);
          }

        }
    
      var itemList = document.getElementById("items");
       for (i = 0; i < requiredPrescriptions.length; i++) {
         var medicineName;
         for(j = 0;j<medicinesArray.length;j++){
          if(requiredPrescriptions[i].medicineId == medicinesArray[j].Id){
           medicineName =  medicinesArray[j].Name;
          }
         }
        
        var li = document.createElement("li");
        li.id=requiredPrescriptions[i].PrescriptionId;
       
        li.className = "prepCard";
       
        var issue = document.createElement("span");
        issue.className = "issueClass";
      // issue.className = "border-end";
        issue.appendChild(document.createTextNode(requiredPrescriptions[i].Issue[0])); 
         li.appendChild(issue);
        var date = document.createElement("span");
        date.className = "dateClass";
        //date.style="border-left:1px solid #ccc;"
       var cal = document.createElement("i");
       cal.className="far fa-calendar-alt";
       cal.style="color: #1e90ff";
       cal.style=" font-size:0.7em";
       date.appendChild(cal);
       var dateString =document.createElement("span");
       dateString.appendChild(document.createTextNode(moment(requiredPrescriptions[i].date).format("L"))); 
       dateString.style="color: #1e90ff";
       dateString.style=" font-size:0.8em";
       date.appendChild(dateString);
       li.appendChild(date);
       var clockspan =document.createElement("span");
       clockspan.id="preShow";
       clockspan.className="preShow";
       //clockspan.style="width:10%;"
      var clock = document.createElement("i");
      clock.className="fas fa-angle-down";
      clock.id='preShow_' + i;
      clockspan.appendChild(clock);
      li.appendChild(clockspan);
      var preShow = document.createElement("div");
      preShow.className="presClass"
      preShow.id="prescription" + i;
      //  preShow.id.style="display:none;"
       preShow.style="margin-top:5%;"
      preShow.style="width:100%;"
      var showDate = document.createElement("div");
      showDate.appendChild(document.createTextNode("Date & Time")); 
      showDate.className="divString";
   
      var dateValue =document.createElement("div");
      dateValue.appendChild(document.createTextNode(moment(requiredPrescriptions[i].date).format("L"))); 
      dateValue.className="valueClass";
       dateValue.style="border-bottom: 1px solid gray;";
      // dateValue.style="margin-left:20px;"
      var showmedicine = document.createElement("div");
      showmedicine.appendChild(document.createTextNode("Medicines")); 
      showmedicine.className="divString";
     
      var medicineValue =document.createElement("div");
      medicineValue.appendChild(document.createTextNode(medicineName)); 
      medicineValue.className="valueClass";
      
      preShow.appendChild(showDate);
      preShow.appendChild(dateValue);
      preShow.appendChild(showmedicine);
      preShow.appendChild(medicineValue);
      
       
       date.appendChild(dateString);
    li.appendChild(preShow);

      
       
       itemList.appendChild(li);
        
    }
        
        });
  }
  $('body').on('click', '#bookId', function () {
   // var audio = new Audio('audio_file.mp3');
    completeSound.play();
    //window.location.href="../test/index.html";
     
  });
  $('body').on('click', '#preShow', function (e) {
      
console.log("preClicked");
    var row  = e.target.parentNode.parentNode.id;
   console.log("row",row)
    for (var i = 0; i<requiredPrescriptions.length;i++) {
      console.log(e.target.parentNode.parentNode.id);
    if(requiredPrescriptions[i].PrescriptionId == row)
    {
      console.log("prescription");
      var prescription = document.getElementById("prescription"+i);
      console.log(prescription);
    var none = "none";
    if (prescription.style.display != none) {
      console.log("hide");
      document.getElementById("prescription"+i).style.display = "none";

 
       } else {
         console.log("show")
        document.getElementById("prescription"+i).style.display = "block";
        document.getElementById("prescription"+i).style.height = "70px";
      }
     
  
   
    }
}
     
  });
  function getAppointmentByPatientId(pId){
    var specialize;
    var outputString1
    var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
    $.get(url + `appointmentDb.json`, function (data, status) {


        var appointmentOutput = JSON.parse(JSON.stringify(data));
       
       console.log("appoint: ", doctorsArray);
       //console.log("spec",doctorsArray);
     for (var i in appointmentOutput) {
     
     if (appointmentOutput[i].patientId === pId) {
       for(var j in doctorsArray){
          console.log("specialization")
    if(doctorsArray[j].Id == appointmentOutput[i].DoctorId)
    {
      //console.log("spec",doctorsArray[k].specialization);
      specialize =doctorsArray[j].specialization;
      outputString1 =doctorsArray[j].url;
     
    }
  }
  const appointmentObject = {
    DoctorId:appointmentOutput[i].DoctorId,
    DoctorName: appointmentOutput[i].DoctorName,
    comment: appointmentOutput[i].comment,
    dateString: appointmentOutput[i].dateString,
    timeSlot: appointmentOutput[i].timeSlot,
    specialization:specialize
  };

 
requiredAppointments.push(appointmentObject)
//console.log("spec",requiredAppointments);
}
    }
 

    var table2 = document.getElementById("appointmentList");
   
   
         console.log("requiredAppointments.length");
          for (i = 0; i < requiredAppointments.length; i++) {
            // if(requiredAppointments[i].DoctorName.slice(0,2) =="Dr"){
            //   console.log(requiredAppointments[i].DoctorName.charAt(4));
            //    outputString1 = requiredAppointments[i].DoctorName.charAt(4);
            // }
            // else{
            //     outputString1 = requiredAppointments[i].DoctorName.charAt(0);
            
            // }
      
              console.log("Trade English Name: " + requiredAppointments[i].DoctorName);
             
              var row = table2.insertRow();
              row.setAttribute('class', 'tr1 parent appointmentcellRow');
              row.setAttribute('data-id', "appointment"+i);
              row.classList.add("apCard");
              console.log("dataid",row.getAttribute("data-id"));
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
               var cell4 = row.insertCell(3);
             
              cell1.innerHTML = ' <img class=test" style="color: white;text-align: center;width: 40px; height: 40px;border-radius: 35px;padding:5px;font-size:1.5em;margin-left: -28%;"src='+outputString1+'"/>'
            
              cell2.innerHTML = ' <div class="border-end"><i class="fas fa-stethoscope    " style="color:gray;font-size: 0.8em;"></i><span style="color:black; font-size: 1em;font-weight:bold">'+requiredAppointments[i].DoctorName+'</span> <div style="color: gray;font-size: 0.7em;">'+requiredAppointments[i].specialization+'</div></div>';
              //cell2.style.width ="50%";
              cell2.className="doctorClass"
              cell3.innerHTML = ' <div style="float:right;" ><i style="color:#1e90ff;font-size: 1em;"class="fas fa-clock " aria-hidden="true"></i> <Span style="color: black;font-weight:bold""id="timeSlotId" >'+requiredAppointments[i].timeSlot+'</Span><div style="color: black; font-size: 0.6em; text-align: center;">'+moment(requiredAppointments[i].dateString).format("L")+'</div></div>';
             // cell3.style.width ="30%";
              cell3.className="appointTime"
              cell4.innerHTML = '<div class="commentClass"><i class="fas fa-clipboard " style="color: gray;margin-left:-1%;"></i><span  style=" font-size:0.8em;width:75%;flex:0 0 auto;"> '+requiredAppointments[i].comment+'</span></div>';
           cell4.style.width ="100%";
           cell4.style.marginLeft ="5%";
           cell4.style.paddingLeft ="5%";
          
          }
        });
  }
  function getMedicines() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        $.get(url + `medicineDb.json`, function (data, status) {
          console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        }).then((res) => {
          if (res) {
            resolve({ status: 200, output: res });

          } else {
            reject({ status: 404 });
          }
        });
      }, 300);
    });
  }
  function gotoPatient(){
    window.location.href="../../patients-cmd/Tamplates/patienthtml.html";
  }
  let boxElement;
  let boxElement1;
  let boxElement2;
let prevRatio = 0.0;
let increasingColor = "white";
let decreasingColor = "rgba(219, 219, 235, ratio)";

// Set things up
window.addEventListener("load", (event) => {
  boxElement = document.querySelector("#items");
  // boxElement1 = document.querySelector("#appointmentList");
  // boxElement2 = document.querySelector("#itemsId");
//boxElement,style="transition-property: background, border-radius";
// boxElement1,style ="transition-property: background, border-radius";
// boxElement2,style ="transition-property: background, border-radius";
  createObserver();
}, false);
        function handleIntersect(entries, observer) {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > prevRatio) {
              entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
             // entry.target.style.transition= "increasingColor 50s";
            } else {
              entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
              // entry.target.style.display = "none"
            }
        
            prevRatio = entry.intersectionRatio;
          });
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
        function createObserver() {
          let observer;
        
          let options = {
            root: null,
            rootMargin: "0px",
            threshold: buildThresholdList()
          };
        
          observer = new IntersectionObserver(handleIntersect, options);
          //observer.observe(boxElement1);
          // observer.observe(boxElement2);
          observer.observe(boxElement);
        }

//module.exports = getAllDoctor,getSymptomsData;
