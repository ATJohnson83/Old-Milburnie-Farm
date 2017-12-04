$(document).ready(function() {

  var loginBtn = $("#loginbtn");
  var userName = $("#login-username");
  var userPassword = $("#login-password");



  
  loginBtn.click(function(event) {
    event.preventDefault();
    var id = userName.val().trim();
    $.get("/api/users/"+id, function(data){
     usertype = data.type;
     gatherData(usertype);
    });
  });

  function gatherData(type){
    var userData = {
      username: userName.val().trim(),
      password: userPassword.val().trim(),
      type: type
    };
    console.log("user data: " + JSON.stringify(userData));
    // if (!userData.name || !userData.password) {
    //   return;
    // };
    loginUser(userData.username, userData.password, userData.type);
  };


  function loginUser(username, password,type) {
    console.log(type + username + password);
    if(type == "Management"){
      console.log("Management User info: " +username+" "+password+" "+type);
      $.post("/api/login/mgmt", {
        username: username,
        password: password
      }).then(function(data) {
        console.log('Data from server: ' +data);
        window.location.replace(data);
      }).catch(function(err) {
        alert(err);
      });
    }
    else if(type == "Employee"){
      console.log("Employee User info: " +username+" "+password+" "+type);
      $.post("/api/login/employee", {
        username: username,
        password: password
      }).then(function(data) {
        window.location.replace(data);
      }).catch(function(err) {
        alert(err);
      });
    }

    else if(type == "Customer"){
      console.log("Customer User info: " +username+" "+password+" "+type);
      $.post("/api/login/customer", {
        username: username,
        password: password
      }).then(function(data) {
        window.location.replace(data);
      }).catch(function(err) {
        alert(JSON.stringify(err));
      });
    }
  };


});

  



