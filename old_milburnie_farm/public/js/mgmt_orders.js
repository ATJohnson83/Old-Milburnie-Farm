"use strict";
$(document).ready(function() {

	var thisUser = $(".member-name");

	loggedInUser();
	getUserOrders();
	showCustOrders();
	showOrdData();

	function showCustOrders(){
		$(".cust_orders_view").show();
		$(".cust_order_view").hide();
	};

	function showCustOrder(){
		$(".cust_orders_view").hide();
		$(".cust_order_view").show();
	};

	function showOrdData(){
		$('#deliv_date').hide();
		$('#pstat').hide();
		$('#ostat').hide();
	};

	$('#editddate').click(function(){
		$('#orddelivd').hide();
		$('#deliv_date').show();
	});

	$('#editpaystat').click(function(){
		$('#ordpaystatus').hide();
		$('#pstat').show();
	})

	$('#editordstat').click(function(){
		$('#ordstatus').hide();
		$('#ostat').show();
	})


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

	 $(document).on('click','button.viewmyorder',function(event){
		event.stopPropagation();
		var id = $(this).data('id');
		getUserOrder(id);
	});

	 function getUserOrder(id){
	 	$.get("/api/order/"+ id, function(data){    
	    console.log("db data:" +JSON.stringify(data));
	    $("#ordcust").text(data.User.name);
	    $("#ordnum").text(data.id);
	    $("#ordnum").attr("data-id",data.id);
	    $("#ordopend").text(data.open_date);
	    $("#orddelivd").text(data.delivered_date);
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
			  newTr.append("<td>$" + itemPrice.toFixed(2) + "</td>");
			  newTr.append("</tr>");
			  $("#viewmyorder").append(newTr);
			}
			getOrderTotals(lineTotals)	
	 	});
	 	showCustOrder();
	};

	$("#savOrd").click(function(){
		var ordId = $("#ordnum").attr('data-id');
		var newDate = $("#deliv_date").val().trim();
		var newOStat = $("#ostat").val().trim();
		var newPStat = $("#pstat").val().trim();
		var orderChanges = {
			id: ordId,
			delivered_date: newDate,
			payment_status: newPStat,
			orders_status: newOStat
		};
		console.log('newdata:' + JSON.stringify(orderChanges));
		 $.ajax({
      method: "PUT",
      url: "/api/orders",
      data: orderChanges
    })
    .done(function() {
      window.location.href = "/mgmt_orders";
    });
	});

	function getOrderTotals(lineTotals){
		var totalPrice = lineTotals.reduce(function(sum, value) {
  	return sum + value;}, 0);
		$("#totalPrice").html(totalPrice.toFixed(2));
	};


});