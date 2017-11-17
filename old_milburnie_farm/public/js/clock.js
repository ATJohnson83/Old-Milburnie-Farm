$(document).ready(function(){

var clockIn= $("#clockIn").val();
var clockOut = $("#clockOut").val();
var totalTime = $("#totalTime");

var clockInTime = $("#clockInTime");
var clockOutTime = $("#clockOutTime");
var totalTimeWorked = $("#totalTime");

totalTime.click(addTime);

getTime()


  function resetList() {
    console.log(`reset list called`);
    clockInTime.empty();
    clockOutTime.empty();
    getTime();
  }

    function getTime() {
    console.log(`get time called`);
   $.get("/api/clock", function(data){  
       console.log(data);
      for (var i = 0; i < data.length; i++) {
        if(data[i].active == true){
          createActiveTimeRow(data[i]);
        }
        else{
          createDeactiveTimeRow(data[i]);
        }
      };
    });
  };

    function addTime(event) {
    console.log(`add time called`);
    event.preventDefault();
    var newTime = {
      clockIn: clockIn,
      clockOut: clockOut,
      total : clockOut - clockIn
      };
    console.log(newTime);
    $.post("/api/clock", newTime, resetList);
    console.log(newTime, resetList);
  }

  function createActiveTimeRow(aTimeData) {
    console.log(`create Time row called`);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.clockIn + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.clockOut + "</td>"
    );
  
    newTr.append("</tr>");
    activeTime.prepend(newTr);
  }

  function createDeactiveHarvestRow(dTaskData) {
    console.log(dTaskData);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.clockIn + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.clockOut + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.total + "</td>"
    );
    newTr.append("</tr>");
    deactiveHarvestList.prepend(newTr);
  }




  






 
 
 }) ;
  
