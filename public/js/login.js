$(document).ready(function() {

  var loginBtn = $("#loginbtn");
  var userName = $("#login-username");
  var userPassword = $("#login-password");



  
  loginBtn.click(function(event) {
    event.preventDefault();
    gatherData();
  });

  function gatherData(){
    var userData = {
      username: userName.val().trim(),
      password: userPassword.val().trim(),
    };
    console.log("user data: " + JSON.stringify(userData));
    // if (!userData.name || !userData.password) {
    //   return;
    // };
    loginUser(userData.username, userData.password);
  };


  function loginUser(username, password) {
    console.log(username+password);
      $.post("/api/login", {
        username: username,
        password: password
      }).then(function(data) {
        console.log('Data from server: ' +data);
        window.location.replace(data);
      }).catch(function(err) {
        console.log(err);
      });
  };

});