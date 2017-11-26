$(document).ready(function() {

	var thisUser = $(".member-name");

	loggedInUser();

function loggedInUser(){
    $.get("/api/user_data").then(function(data) {
      thisUser.text(data.name);
      thisUser.attr("value", data.id);
    });
  };

});