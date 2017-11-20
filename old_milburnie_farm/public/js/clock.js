
$(document).ready(function(){


//register clock in time
 $("#clockIn").click(function(){
  clockIn = new Date();
});
 
//register clock out time
$("#clockOut").click(function(){
clockOut =  new Date();
});

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
      
      for (var i = 0; i < data.length; i++) {
          createActiveTimeRow(data[i]);
      };
    });
  };

  //function to add total time
  function addTime(event) {
    

  var total = Math.abs(clockOut - clockIn);
  var minutes = Math.floor(total / 60000);
  var seconds = ((total % 60000) / 1000).toFixed(0);
  
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
    var newTime = {
      clockIn: clockIn,
      clockOut: clockOut,
      minutes : minutes,
      seconds: seconds
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
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.minutes + ":" + aTimeData.seconds +"</td>"
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
  
