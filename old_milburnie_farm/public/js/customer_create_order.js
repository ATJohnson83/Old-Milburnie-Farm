$(document).ready(function() {

  var thisUser = $(".member-name");

	loggedInUser();
	getSalesInventory();
	showCreateScreen();

	function showCreateScreen(){
		$('.create_order').show();
		$('.confirm_order').hide();
	}

	function createOrder(){
		var date = new Date();
		var formattedDate = moment(date).format('YYYY-MM-DD');
		orderData={
			UserId: thisUser.attr("value"),
			open_date: formattedDate 
		};
		console.log(orderData);
		$.post("/api/orders", orderData, function(data) {
		console.log("db return: " + JSON.stringify(data));
		var orderNum = data.id;
		$('#ordnum').text(orderNum);
		var odate = data.open_date;
		$('#ordopend').text(odate);
		var cdate = data.close_date;
		$('#ordclosed').text(cdate);
      // window.location.href = "/blog";
    });
	}

	function showConfirmScreen(){
		$('.create_order').hide();
		$('.confirm_order').show();
	}

	function createOrderLines(olines){
		var confirmOL = $('#confirmol');
		var oltotals = [];
		for (var i = 0; i < olines.length; i++) {
			var olquant = olines[i].quantity;
			var olprice = olines[i].price;
			var oltotal = olquant * olprice;
			oltotals.push(oltotal);
			var newOLtr = $("<tr>");
			newOLtr.append("<td>"+ (i+1)+"</td>");
			newOLtr.append("<td>"+ olines[i].name+"</td>");
			newOLtr.append("<td>"+ olines[i].type+"</td>");
			newOLtr.append("<td>"+ olquant+"</td>");
			newOLtr.append("<td>"+ olines[i].unit+"</td>");
			newOLtr.append("<td>$ "+ olprice+"</td>");
			newOLtr.append("<td>$"+ oltotal.toFixed(2)+"</td></tr>");
			confirmOL.append(newOLtr);
		}
		console.log(typeof oltotals[1]);
		getOrderTotals(oltotals);
	};

	function getOrderTotals(oltotals){
		var oltots = oltotals.reduce(function(sum, value) {
  	return sum + value;}, 1);
  	console.log("oltots: "+oltots);
	
			$("#oltotals").html(oltots.toFixed(2));
	};

	function loggedInUser(){
    $.get("/api/user_data").then(function(data) {
    	console.log(JSON.stringify(data));
      thisUser.attr("value", data.id);
      thisUser.text(data.name);
      console.log('here: ' + thisUser.attr("value"));
    });
  };

	function getSalesInventory(){
	    $.get("/api/sales_inventory", function(data){ 
	    console.log("db data: " + JSON.stringify(data));    
	      for (var i = 0; i < data.length; i++) {
	        if(data[i].active == true){
	          createActiveItemRow(data[i]);
	        }
	      };
	    });
	  };

	function createActiveItemRow(aItemData){
	  var newTr = $("<tr class='row-select'>");
	  newTr.append("<td class = 'name' type='" + aItemData.type + " 'data-id='" + aItemData.id + "'>" + aItemData.name + "</td>");
	  newTr.append("<td class = 'quantavail' data-id='" + aItemData.id + "'>" + aItemData.quantity + "</td>");
	  newTr.append("<td class = 'unit' data-id='" + aItemData.id + "'>" + aItemData.unit + "</td>");
	  newTr.append("<td>$<span class = 'price' data-id='" + aItemData.id + "'>" + aItemData.price + "</span></td>");
	  newTr.append("<td>|</td>");
	  newTr.append("<td><input class='quant' type='text'></td>");
	  newTr.append("</tr>");

	  switch (aItemData.type) {
		  case "Chicken":
		      $('#chickentb').append(newTr);
		      break;
		  case "Pork":
		       $('#porktb').append(newTr);
		      break;
		  case "Vegetable":
		       $('#vegetabletb').append(newTr);
		      break;
		  case "Mushroom":
		       $('#mushroomtb').append(newTr);
		      break;
		  case "Other":
		       $('#othertb').append(newTr);
		      break;
		}
	};


  $('#create_order').click(function() {
  	var orderArr = [];
    var id, name, quantavail, type, unit, price, quantity;
    var alertArr = [];
    
    $('.row-select input[type="text"]').each(function() {
    	if ($(this).val().trim().length > 0){
	       
	      name = $(this).closest('tr').find('.name').html();
	      quantavail = $(this).closest('tr').find('.quantavail').html();
	      type = $(this).closest('tr').find('.name').attr('type');
	      unit = $(this).closest('tr').find('.unit').html();
	      price = $(this).closest('tr').find('.price').html();
	      quantity = $(this).closest('tr').find('.quant').val().trim();
	      
	      orderObj = {'name':name,'type':type,'unit':unit,'price':price,'quantity':quantity};
	      orderArr.push(orderObj);

	      if (parseInt(quantity) > parseInt(quantavail)){
	      	alertArr.push(name);
	      }     	
	   	}
    })
    
    if (alertArr.length > 0){
    	alert("Please Enter valid " + alertArr+" quantities.");
    	return false;
    } 
    else{
    	console.log("orderArr :" + JSON.stringify(orderArr));
    	showConfirmScreen();
    	createOrderLines(orderArr);
 			createOrder();
    }	
  });


});

// do something like this ^ to go through table rows, and get the sales inventory id and amount entered by customer
// for each checked item, put them in an array [{item id: 1, item quant: 4}, {item id: 3, item quant: 6}] etc.
// 	then creat a new table from this array for the "confirm customer order modal", then if they confirm order
// add that data to the order lines db table, and the customer/ order # info to the orders db table.