   //var $ = require("jquery");

var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
var completeSound = document.getElementById("myAudio");

function  getPatientCardInfo() {
   return new Promise((resolve,reject)=>{
    // file deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
    $.get(url + "patientDb.json", function (data, status) {
    }
    ).then((res)=>{
      if(res){

        for(j in res)
      resolve({ status:200,output:res[j].pId});

      var output = JSON.parse(JSON.stringify(res));
     
      for (var i in output) {

        var containers=document.getElementById('myItems');
        var outSideCardDiv=document.createElement('div');
        outSideCardDiv.className='col';
       // outSideCardDiv.id='patientInfo';

        var card=document.createElement('div');
        card.className='card';
       
       
        var row3=document.createElement('div');
        row3.className='row3';
        row3.style='display: flex; margin: 5px; margin: 10px 0px 10px';
        //1st div
        var col1=document.createElement('div');
        col1.className='col';
        col1.id='patientInfo'
        var image=document.createElement('img');
        image.style="width: 50px; height: 50px; border-radius: 50%";
        image.src=`${output[i].pUrl}`;
        
        image.className='card-img-top';
        image.alt="Pimg";
        image.id=output[i].pId;
        col1.appendChild(image);
        row3.appendChild(col1);
        //console.log(row3);
        
        //2nd div
        var col2=document.createElement('div');
        col2.className='col';
        col2.style='margin-left: 10px';
        var ulTag=document.createElement('ul');
        ulTag.id="ultag"
        ulTag.style='list-style-type: none';
        var liTag1=document.createElement('li');
        liTag1.className='card-title';
        liTag1.style='font-weight: bold';
        liTag1.innerHTML=`${output[i].pName}`;
        ulTag.appendChild(liTag1);
        var liTag2=document.createElement('li');
        liTag2.style='opacity: 0.6; font-size: small';
        liTag2.innerHTML=`${output[i].pLocation}`;
        ulTag.appendChild(liTag2);
        var liTag3=document.createElement('li');
        liTag3.style='opacity: 0.6; font-size: small';
        
        liTag3.innerHTML=` Mobile: ${output[i].pMobile}`;
        ulTag.appendChild(liTag3);
        col2.appendChild(ulTag);
        row3.appendChild(col2);
        // console.log(row3);
        //3rd div
        var col3=document.createElement('div');
        col3.className='col';
        col3.id='itagInfo';
       

        var iTag=document.createElement('i');
        iTag.style='float: right; font-size: 10px; ';
        iTag.className='far fa-volume m-1 mice';
        iTag.id=output[i].audioInfo;
        col3.appendChild(iTag);
        row3.appendChild(col3);
        card.appendChild(row3);
        outSideCardDiv.appendChild(card);
        //hr tag
        var hrTaag=document.createElement('hr');
        hrTaag.style='opacity: 0.5';
        card.appendChild(hrTaag);
        
        //div for symbols
        var symbolsDiv=document.createElement('div');
        symbolsDiv.style='display: flex;  justify-content: space-around;  margin: 10px;';
        
        //symboldiv1
        var symbolsDiv1=document.createElement('div');
        symbolsDiv1.className='p-2 bd-highlight';
        var iTag1=document.createElement('i');
        iTag1.className='fas fa-lungs';
        iTag1.style='opacity: 0.6';
        symbolsDiv1.appendChild(iTag1);
        symbolsDiv.appendChild(symbolsDiv1);
        //symbolsdiv2
        var symbolsDiv2=document.createElement('div');
        symbolsDiv2.className='p-2 bd-highlight';
        var iTag2=document.createElement('i');
        iTag2.className='fas fa-male';
        iTag2.style='opacity: 0.6';
        symbolsDiv2.appendChild(iTag2);
        symbolsDiv.appendChild(symbolsDiv2);
        //symboldiv3
        var symbolsDiv3=document.createElement('div');
        symbolsDiv3.className='p-2 bd-highlight';
        var iTag3=document.createElement('i');
        iTag3.className='fas fa-lungs';
        iTag3.style='opacity: 0.6';
        symbolsDiv3.appendChild(iTag3);
        symbolsDiv.appendChild(symbolsDiv3);
        card.appendChild(symbolsDiv);
        outSideCardDiv.appendChild(card);
     //  console.log(outSideCardDiv);
        containers.appendChild(outSideCardDiv);
      
      }
 
   
      }
      else{
      reject({status:404});
      }
    });
  
  })//promise end
}
getPatientCardInfo();

function  getDoctorImgName() {
  return new Promise((resolve,reject)=>{
   // file deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
   $.get(url + "doctorDb.json", function (data, status) {
   }
   ).then((res)=>{
     if(res){

    

     var doctor = JSON.parse(JSON.stringify(res));

     for (var i in doctor) {

       var result = 
       `    
       <li><a href="#">Logout</a></li>
       <li>
         <a href="#" class="notification">
           <span class="fad fa-bell"></span>
           <span class="badge"></span>
         </a>
       </li>
       <li>
         <span style="margin-bottom: 10px" class="dropdown">
           ${doctor[i].Name}
           <button class="dropbtn">
             <i style="color: black" class="fal fa-angle-down"></i>
           </button>
           <div class="dropdown-content">
             <a href="#">Link 1</a>
             <a href="#">Link 2</a>
             <a href="#">Link 3</a>
           </div>
         </span>
       </li>
       <li>
         <a href="#"><img class="img1" src="${doctor[i].ProfileUrl}" alt="..."></a>
       </li>
     `;
  
         document.getElementById('getNav').innerHTML += result;
     }
  
     }
     else{
     reject({status:404});
     }
   });
 
 })//promise end
}
getDoctorImgName();

//filter fuction by names


function myFunction() {
    // completeSound.play();
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myItems");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".row3 .col ul li.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function sound(){

  $.get(url + "doctorDb.json", function (data, status) {

    //console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

    var sound1 = JSON.parse(JSON.stringify(data));

    for(var m in sound1){

     var sound2=`
      <audio id="myAudio">
      <source
      src="${sound1[m].patientInfo}"
      type="audio/wav"
      />
      Your browser does not support the audio element.
      </audio>
      `
      document.getElementById('noise').innerHTML=sound2;
    console.log(sound1[m].patientInfo);

    document.getElementById('myAudio').play();
    }

  });

}

$('body').on('click', '#patientInfo', function (e) {
  var row  = $(this)[0].firstElementChild.id;

window.location.href="../../patientView/Tamplate/PatientsView.html?text1="+row;

});

$('body').on('click', '#itagInfo', function (e) {
  var row  = $(this)[0].firstElementChild.id;
console.log("patient clicked",row)

var sound2=`
<audio id="myAudio2">
<source
src="${row}"
type="audio/wav"
/>
Your browser does not support the audio element.
</audio>
`
document.querySelector('.mice').innerHTML=sound2;


document.getElementById('myAudio2').play();
  
});
 
 
 //module.exports=getPatientCardInfo;
  

