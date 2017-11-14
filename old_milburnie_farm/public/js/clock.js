

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
      let totalTime = Math.floor(total / 60);
      
      console.log(totalTime);

     }
  
  $.get("/api/clock"), function(data){
    console.log(data);
  }



 
 
 }) ;
  
