$(document).ready(function() {
  /* global moment */

  $("#loginbtn").click(function(){
    var login = $("#login-type").val();
    var password = $("#password-type").val();
    console.log(login, password)
    login()
  });
 
  var login = () => {

     var login = $("#login-type").val();
     var password = $("#password-type").val();
     console.log(login, password);
    
  }
 
 }) ;
  

  



