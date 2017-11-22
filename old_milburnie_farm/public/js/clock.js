
$(document).ready(function(){


var totalTime = $("#totalTime");
var clockInTime = $("#clockInTime");
var clockOutTime = $("#clockOutTime");
var totalTimeWorked = $("#totalTime");
var activeTimeList = $("#activeTime");
var deactiveTime = $("#deactiveTime");
$(document).on("click", "button.user_delete", deleteTime);
$(document).on("click", "button.totalTimeWorked", totalTime);

//add tiem function
totalTimeWorked.click(addTime);

//get time function on page load
getTime()

//reset list gets called afted add Time
  function resetList() {
    console.log(`reset list called`);
    activeTimeList.empty();
    clockOutTime.empty();
    getTime();
  }
//get time called after reset list
    function getTime() {
    console.log(`get time called`);
   $.get("/api/clock", function(data){  
      console.log(data);
    
      //register clock in time

      $("#clockInBtn").click(function(){
        clockIn = moment();
      });
 
      
 
//register clock out time

      $("#clockOutBtn").click(function(){
        clockOut =  moment();
        });

      $("#clockInBtn").click(function(){
        clockIn = moment();
      })

      

      // total = clockOut.diff(clockIn, 'minutes');
      // console.log(total);   
      for (var i = 0; i < data.length; i++) {
          createActiveTimeRow(data[i]);
      };
    });
  };

  //function to add total time
  function addTime(event) {
    
    var newTime = {
      clockIn: clockIn.format('hh:mm'),
      clockOut: clockOut.format('hh:mm'),
      total: clockOut.diff(clockIn, 'minutes')
      };

    $.post("/api/clocks", newTime, resetList);
  }

  function createActiveTimeRow(aTimeData) {
    console.log(`create time row called`);
    console.log(aTimeData);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.clockIn + "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.clockOut + "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.total +"</td>"
    );
    
      newTr.append(
        "<td><button data-id='"+aTimeData.id+"' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>"
    );
  
    newTr.append("</tr>");
    activeTimeList.prepend(newTr);
  }

  function createDeactiveTimeRow(dTimeData) {
    console.log(dTimeData);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + dTimeData.id + "'>" + dTimeData.clockIn + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTimeData.id + "'>" + dTimeData.clockOut + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTimeData.id + "'>" + dTimeData.minutes + ":" + dTimeData.seconds  + "</td>"
    );
    newTr.append("</tr>");
    deactiveTime .prepend(newTr);
  }


    function deleteTime(event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/clocks/" + id
    }).done(resetList);
  }




 }); //close document ready function
  
