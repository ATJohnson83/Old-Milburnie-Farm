
$(document).ready(function(){



 $("#clockIn").click(function(){
 clockInTime = new Date()
 clockIn = moment(clockInTime, "hh:mm")
 console.log(clockIn);

});
 $("#clockOut").click(function(){
clockOutTime = new Date();
clockOut =  moment(clockOutTime, "hh:mm");
console.log(clockOut)
});
var totalTime = $("#totalTime");

var clockInTime = $("#clockInTime");
var clockOutTime = $("#clockOutTime");
var totalTimeWorked = $("#totalTime");

var activeTime = $("#activeTime");

totalTimeWorked.click(addTime);

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
   
    let total = clockOut.diff(clockIn, "minutes");
    console.log( total);
    var newTime = {
      clockIn: clockIn,
      clockOut: clockOut,
      totalTime : total,
      isActive: true
      };
    console.log(newTime);
    $.post("/api/clock", newTime, resetList);
    console.log(newTime, resetList);
  }

  function createActiveTimeRow(aTimeData) {
    console.log(`create Time row called`);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.clockIn + "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.clockOut + "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.TotalTime + "</td>"
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
  
