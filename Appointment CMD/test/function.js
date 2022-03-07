  // Hide submenus
  $('#body-row .collapse').collapse('hide');

  // Collapse/Expand icon
  $('#collapse-icon').addClass('fa-angle-double-left');
 
  // Collapse click
  $('[data-toggle=sidebar-colapse]').click(function () {
      SidebarCollapse();
  });
 
  function SidebarCollapse() {
      $('.menu-collapsed').toggleClass('d-none');
      $('.sidebar-submenu').toggleClass('d-none');
      $('.submenu-icon').toggleClass('d-none');
      $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
 
      // Treating d-flex/d-none on separators with title
      var SeparatorTitle = $('.sidebar-separator-title');
      if (SeparatorTitle.hasClass('d-flex')) {
          SeparatorTitle.removeClass('d-flex');
      } else {
          SeparatorTitle.addClass('d-flex');
      }
 
      // Collapse/Expand icon
      $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
  }
 
  $(document).ready(function () {
 
      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;
 
      $(".next").click(function () {
 
          current_fs = $(this).parent();
          next_fs = $(this).parent().next();
 
          //Add Class Active
          $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
 
          //show the next fieldset
          next_fs.show();
          //hide the current fieldset with style
 
          current_fs.css({
              'display': 'none',
              'position': 'relative'
          });
          next_fs.css({
              'opacity': opacity
          });
      });
 
      $(".previous").click(function () {
 
          current_fs = $(this).parent();
          previous_fs = $(this).parent().prev();
 
          //Remove class active
          $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
 
          //show the previous fieldset
          previous_fs.show();
 
          //hide the current fieldset with style
 
          current_fs.css({
              'display': 'none',
              'position': 'relative'
          });
          previous_fs.css({
              'opacity': opacity
          });
      });
 
      $('.radio-group .radio').click(function () {
          $(this).parent().find('.radio').removeClass('selected');
          $(this).addClass('selected');
      });
 
      $(".submit").click(function () {
          return false;
      })


      var leaveAdio = []
      $.get("https://cmd-ui-demo-default-rtdb.firebaseio.com/doctorDb.json", function (data, status) {
          console.log("Data: " + data + "\nStatus: " + status);
          if (status === 'success') {
            leaveAdio = data;
          }
      });
 
 
      $('#datepicker').datepicker({
        format: 'dd-mm-yyyy',
        startDate: '-1d'
      });
      $('#datepicker1').datepicker('setDate', new Date(2022, 1, 23));
      $('#datepicker').on('changeDate', function () {        
        var formatedDate = $('#datepicker').datepicker('getFormattedDate');
        $.each(leaveAdio, function(key,value) {
            var audio = new Audio(value.leaveAudio);
            $.each(value.leaveDates, function(k,v){
                if(v === formatedDate){
                    audio.play();
                }
            })
        })
          $('#my_hidden_input').val($('#datepicker').datepicker('getFormattedDate'));
      });
 
      $('.show-card').on('click', function () {
          $('.card-box').slideToggle();
      })
 
      var patientList = []
      $.get("https://cmd-ui-demo-default-rtdb.firebaseio.com/patientDb.json", function (data, status) {
          console.log("Data: " + data + "\nStatus: " + status);
          if (status === 'success') {
              patientList = data;
              $.each(patientList, function (key, value) {
                  $('#patient').append('<option data-value="' + value.pId + '">' +
                      value.pName + '</option>');
              })
          }
      });
 
      $('#step-1-submit').on('click', function () {
          var patientName = $('#patient-id').val();
          var selectedPatient = Object.values(patientList).filter(item => item.pName ===
              patientName);
          localStorage.setItem('patientDetail', selectedPatient[0]);
      })
 
      $('#step-2-submit').on('click', function () {
          var patientIssue = $('#patient-issue').val();
          var patientReasone = $('#patient-reasone').val();
          var obj = {
              Issues: patientIssue,
              reasone: patientReasone
          }
          localStorage.setItem('patientIssue', obj);
      })
 
      $('#step-3-submit').on('click', function () {
          var date = $('#my_hidden_input').val();
          var val = [];
          $(':checkbox:checked').each(function (i) {
              val[i] = $(this).val();
          });
 
          console.log('sound');
          new Audio("me-too-603.mp3").play();
 
          var id = Math.floor(Math.random() * 26) + Date.now();
          var body = {
              appointmentId: id,
              appointmentTime: val,
              appointmentDate: date,
          };
          var url = "https://cmd-ui-demo-default-rtdb.firebaseio.com/";
          $.post(
              url + "appointmentDb.json",
              JSON.stringify(body),
              function (data, status) {
                  console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
                  var objData
                    $.get(url + `appointmentDb.json`,
                        function (data, status) {
                            var output = JSON.parse(JSON.stringify(data));
                            for (i in output) {
                                if (output[i].appointmentId === id) {
                                    objData = output[i];
                                }
                            }
                        });
                    var obj = {
                        "-MvOujfOo7wQS6OUbh8v": objData,
                    };
                    $.ajax({
                        url: "https://cmd-ui-demo-default-rtdb.firebaseio.com/NewAppointment.json/",
                        method: "PUT",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(obj),
                        success: function (results) {
                            console.log(results);
                        },
                    });
                    var ourRequest = new XMLHttpRequest();
                    ourRequest.open("POST", url + "appointment.json", body);
                    ourRequest.onload = function () {
                        if (ourRequest.status >= 200 && ourRequest.status < 400) {
                            var ourData = JSON.parse(ourRequest.responseText);
                            console.log(ourData);
                        } else {
                            console.log("Connected to the server but returnrd an error");
                        }
                    };
                    ourRequest.onerror = function () {
                        console.log("Connection Error");
                    };
                    ourRequest.send();
              }
          );
          
      })
 
      $.ajax({
         url: "https://cmd-ui-demo-default-rtdb.firebaseio.com/appointmentDb.json",
         method: "GET",
         contentType: "application/json; charset=utf-8",
         success: function (results) {
             $.each(results, function (key, value) {
                 $('#appointmentData').append('<div class="card">'+
                 '<div class="card-top">'+
                     '<span class="card-avatar">  '+
                     
                     value.DoctorName.charAt(0)+
                     '</span>'+
                     '<Span class="patient-detail">'+
                         '<span class="card-name">'+
                             '<i class="fa fa-user-alt"></i>'+
                             value.DoctorName+
                         '</span>'+
                         '<span class="tags">'+
                             value.Issues.toString()+
                         '</span>'+
                     '</span>'+
                     '<span class="schedule detail">'+
                         '<span class="left-sched text-danger">'+
                             '<i class="fa fa-calendar-alt"></i>'+
                         '</span>'+
                         '<span class="right-shed">'+
                             '<i class="fa fa-clock"></i>'+
                             value.timeSlot+
                         '</span>'+
                     '</span>'+
                 '</div>'+
                 '<div class="card-detail">'+
                     value.comment+
                 '</div>'+
             '</div>');
             })
             
         },
     });
 
  });