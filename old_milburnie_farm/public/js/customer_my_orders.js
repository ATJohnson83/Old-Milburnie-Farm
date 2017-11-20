"use strict";
$(document).ready(function() {

	var thisUser = $(".member-name");

	loggedInUser();
	
	

	function loggedInUser(){
    $.get("/api/user_data").then(function(data) {
      thisUser.text(data.name);
      thisUser.attr("value", data.id);
      getUserOrders(data);
    });
  };

  function getUserOrders(data){
  	var id = data.id; 
  	console.log(id);
	    $.get("/api/orders/"+ id, function(data){    
	      for (var i = 0; i < data.length; i++) {
	        if(data[i].Active == true){
	          createActiveRow(data[i]);
	        }
	      };
	      console.log("db data:" +JSON.stringify(data));
	    })
	 };

	 function createActiveRow(data){
	 	var customeractords = $('#customeractords');
	 	var myOrderstr = $("<tr>");
			myOrderstr.append("<td>"+ data.id +"</td>");
			myOrderstr.append("<td>"+ data.open_date+"</td>");
			myOrderstr.append("<td>"+ data.close_date+"</td>");
			myOrderstr.append("<td><button class='btn btn-primary'></button></td>");
		customeractords.append(myOrderstr);
	 }

});