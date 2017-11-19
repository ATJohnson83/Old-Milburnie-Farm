
$(document).ready(function(){



 $("#clockIn").click(function(){
 
 clockIn = new Date();

 console.log(clockIn);

});
 $("#clockOut").click(function(){

clockOut =  new Date();

console.log(clockOut)
});
var totalTime = $("#totalTime");

var clockInTime = $("#clockInTime");
var clockOutTime = $("#clockOutTime");
var totalTimeWorked = $("#totalTime");

var activeTimeList = $("#activeTime");
var deactiveTime = $("deactiveTime");
$(document).on("click", "button.user_delete", deleteTime);

totalTimeWorked.click(addTime);

getTime()


  function resetList() {
    console.log(`reset list called`);
    activeTimeList.empty();
    clockOutTime.empty();
    getTime();
  }

    function getTime() {
    console.log(`get time called`);
   $.get("/api/clock", function(data){  
       console.log(data);
      for (var i = 0; i < data.length; i++) {
       
          createActiveTimeRow(data[i]);
      };
    });
  };

    function addTime(event) {
    console.log(`add time called`);

  var total = Math.abs(clockOut - clockIn);
   var minutes = Math.floor(total / 60000);
  var seconds = ((total % 60000) / 1000).toFixed(0);
  


  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  console.log(minutes, seconds);
   
    
    console.log( total);
    var newTime = {
      clockIn: clockIn,
      clockOut: clockOut,
      minutes : minutes,
      seconds: seconds
      };
    console.log(newTime);
    $.post("/api/clock", newTime, resetList);
    console.log(newTime, resetList);
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



  






 
 
 }) ;
  
