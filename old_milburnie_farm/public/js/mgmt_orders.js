"use strict";
$(document).ready(function() {


	getUserOrders();
	showCustOrders();
	showOrdDate();

	function showCustOrders(){
		$(".cust_orders_view").show();
		$(".cust_order_view").hide();
	};

	function showCustOrder(){
		$(".cust_orders_view").hide();
		$(".cust_order_view").show();
	};

	function showOrdDate(){
		$('#editdatediv').hide();
	};

	$('#datediv').click(function(){
		$('#datediv').hide();
		$('#editdatediv').show();
	});

	$('#btco').click(function(event){
		event.stopPropagation();
		window.location.href = "/mgmt_orders";

	});


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
			Opentr.append("<td><button data-id='"+ data.id +"' class='viewmyorder btn btn-primary glyphicon glyphicon-sunglasses'></button></td></tr>");
		opentbl.append(Opentr);
	 };

	 function createClosedRow(data){	 
	 	var closedtbl = $('#closedtbl');
	 	var Closedtr = $("<tr>");
			Closedtr.append("<td>"+ data.id +"</td>");
			Closedtr.append("<td>"+ data.User.name+"</td>");
			Closedtr.append("<td>"+ data.open_date+"</td>");
			Closedtr.append("<td><button data-id='"+ data.id +"' class='viewmyorder btn btn-primary glyphicon glyphicon-sunglasses'></button></td>");
			Closedtr.append("<td><button data-id='"+ data.id +"' class='deleteorder btn btn-danger glyphicon glyphicon glyphicon-remove'></button></td></tr>");
		closedtbl.append(Closedtr);
	 };

	 $(document).on('click','button.viewmyorder',function(event){
		event.stopPropagation();
		var id = $(this).data('id');
		getUserOrder(id);
	});

	 $(document).on('click','button.deleteorder',function(event){
		event.stopPropagation();
		var id = $(this).data('id');
		$.ajax({
      method: "DELETE",
      url: "/api/orders/" + id
    }).done(function(){
    	window.location.href = "/mgmt_orders";
    })
	});


	 function getUserOrder(id){
	 	$.get("/api/order/"+ id, function(data){    
	    console.log("db data:" +JSON.stringify(data));
	    $("#ordcust").text(data.User.name);
	    $("#ordnum").text(data.id);
	    $("#ordnum").attr("data-id",data.id);
	    $("#ordopend").text(data.open_date);
	    if(data.delivered_date == "0000-00-00"){
	    	$("#orddelivd").text('Undelivered');
	    }
	    else{
	    	 $("#orddelivd").text(data.delivered_date);
	    };
	    $("#ordpaystatus").text(data.payment_status);
	    $("#ordstatus").text(data.order_status);
	  }).done(function(){

	  	getUserOrderLines(id);
	  });
	};

	function getUserOrderLines(id){
		$("#viewmyorder").empty();
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

	$(".ordstat").click(function(){
		alert("ordstat");
		var ordstat = $(this).data("id");
		var id =  $("#ordnum").data("id");
		var order = {
			id: id,
			order_status: ordstat
		};	
		 $.ajax({
      method: "PUT",
      url: "/api/orders",
      data: order
    })
    .done(function() {
     getUserOrder(id);
    });
	});

	$(".paystat").click(function(){
		var paystat = $(this).data("id");
		var id =  $("#ordnum").data("id");
		var payment = {
			id: id,
			payment_status: paystat
		};	
		 $.ajax({
      method: "PUT",
      url: "/api/orders",
      data: payment
    })
    .done(function() {
     getUserOrder(id);
    });
	});

	$("#save_date").click(function(){
		var deliv_date = $("#deliv_date").val().trim();
		var id =  $("#ordnum").data("id");
		var delivered = {
			id: id,
			delivered_date: deliv_date
		};	
		 $.ajax({
      method: "PUT",
      url: "/api/orders",
      data: delivered
    })
    .done(function() {
     getUserOrder(id);
    });
	});

	$("#clear_date").click(function(){
		$("#deliv_date").val(null);
	});


	function getOrderTotals(lineTotals){
		var totalPrice = lineTotals.reduce(function(sum, value) {
  	return sum + value;}, 0);
		$("#totalPrice").html(totalPrice.toFixed(2));
	};


});