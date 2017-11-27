"use strict";
$(document).ready(function() {

	var thisUser = $(".member-name");
	
	showMyOrders();
	loggedInUser();

	$('#btmo').click(showMyOrders);
	

	function loggedInUser(){
    $.get("/api/user_data").then(function(data) {
      thisUser.text(data.name);
      thisUser.attr("value", data.id);
      getUserOrders(data);
    });
  };

	function showMyOrders(){
		$(".my_orders_view").show();
		$(".my_order_view").hide();
	};

	function showMyOrder(){
		$(".my_orders_view").hide();
		$(".my_order_view").show();
	};


  function getUserOrders(data){
  	var id = data.id; 
  	console.log(id);
	    $.get("/api/orders/"+ id, function(data){    
	      for (var i = 0; i < data.length; i++) {

	        if(data[i].order_status == "Open"){

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

			myOrderstr.append("<td><button data-id='"+ data.id +"' class='viewmyorder btn btn-primary glyphicon glyphicon-sunglasses'></button></td>");
		customeractords.append(myOrderstr);
	 }

	$(document).on('click','button.viewmyorder',function(event){
		event.stopPropagation();
		var id = $(this).data('id');
		getUserOrder(id);
	});
	
	function getUserOrder(id){
	 	$.get("/api/order/"+ id, function(data){    
	    console.log("db data:" +JSON.stringify(data));
	    $("#ordnum").text(data.id);
	    $("#ordopend").text(data.open_date);	    
	    if(data.delivered_date == "0000-00-00"){
	    	$("#orddelivd").text('Undelivered');
	    }
	    else{
	    	 $("#orddelivd").text(data.delivered_date);
	    };
	    $("#ordpaystatus").text(data.payment_status);
	    $("#ordstatus").text(data.order_status);
	  }).done(getUserOrderLines(id));
	};

	function getUserOrderLines(id){
		$.get("/api/order_lines/" + id, function(data){
			var lineTotals = [];
			for (var i = 0; i < data.length; i++) {
				var quant = parseFloat(data[i].Quantity);
				var price = parseFloat(data[i].Price);
				var itemPrice = quant * price;
				lineTotals.push(itemPrice);
				var newTr = $("<tr class='row-select'>");
				newTr.append("<td>"+(i+1)+"</td>");
			  newTr.append("<td>" + data[i].name + "</td>");
			  newTr.append("<td>" + data[i].type + "</td>");
			  newTr.append("<td>" + data[i].Quantity + "</td>");
			  newTr.append("<td>" + data[i].Unit + "</td>");
			  newTr.append("<td>$<span class = 'price'>" + data[i].Price + "</span></td>");
			  newTr.append("<td>" + itemPrice.toFixed(2) + "</td>");
			  newTr.append("</tr>");
			  $("#viewmyorder").append(newTr);
			}
			getOrderTotals(lineTotals)	
	 	});
	 	showMyOrder();
	};

	function getOrderTotals(lineTotals){
		var totalPrice = lineTotals.reduce(function(sum, value) {
  	return sum + value;}, 0);
		$("#totalPrice").html(totalPrice.toFixed(2));
	};




});