

$(document).ready(function() {
  /* global moment */
  moment().format('HH:mm')



  $("#clockIn").click(function(){
    
    clock = moment().unix();
    console.log(`clocked in at: ${clock}`);
    alert(`clocked in at: ${clock}`)
  });

    $("#clockOut").click(function(){
    clockOut = moment().unix();
    console.log(`clocked out at ${clockOut}`);
    alert(`clocked out at: ${clockOut}`)
    totalTime()

  });

  var totalTime = () => {
      let total = clockOut - clock;
      let minutes = Math.floor(total / 60);
      let seconds = total % 60;
      console.log(`${minutes}: ${seconds}`)


     }
  
  $.get("/api/clock"), function(data){
    console.log(data);
  }

  $("#clockIn").text(total);



 
 
 }) ;
  
