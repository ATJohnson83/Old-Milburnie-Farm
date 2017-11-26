"use strict";
$(document).ready(function() {

	var thisUser = $(".member-name");

	loggedInUser();
	getUserOrders();

	function loggedInUser(){
    $.get("/api/user_data").then(function(data) {
      thisUser.text(data.name);
      thisUser.attr("value", data.id);
    });
  };

  function getUserOrders(){ 
    $.get("/api/orders/", function(data){    
      for (var i = 0; i < data.length; i++) {
        if(data[i].order_status == "Open"){
          createOpenRow(data[i]);
        }
        else {
        	createClosedRow(data[i]);
        }
      };
      console.log("db data:" +JSON.stringify(data));
    })
	};

	function createOpenRow(data){
	 	var opentbl = $('#opentbl');
	 	var Opentr = $("<tr>");
			Opentr.append("<td>"+ data.id +"</td>");
			Opentr.append("<td>"+ data.User.name+"</td>");
			Opentr.append("<td>"+ data.open_date+"</td>");
			Opentr.append("<td><button data-id='"+ data.id +"' class='viewmyorder btn btn-primary glyphicon glyphicon-sunglasses'></button></td>");
		opentbl.append(Opentr);
	 };

	 function createClosedRow(data){	 
	 	var closedtbl = $('#closedtbl');
	 	var Closedtr = $("<tr>");
			Closedtr.append("<td>"+ data.id +"</td>");
			Closedtr.append("<td>"+ data.User.name+"</td>");
			Closedtr.append("<td>"+ data.open_date+"</td>");
			Closedtr.append("<td><button data-id='"+ data.id +"' class='viewmyorder btn btn-primary glyphicon glyphicon-sunglasses'></button></td>");
		closedtbl.append(Closedtr);
	 };


});