$(document).ready(function() {

	loggedInForeman();
	getSalesInventory();
	showCreateScreen();

	function showCreateScreen(){
		$('.create_order').show();
		$('.confirm_order').hide();
	}

	function showConfirmScreen(){
		$('.create_order').hide();
		$('.confirm_order').show();
	}

	function loggedInForeman(){
    $.get("/api/user_data").then(function(data) {
    	console.log(data);
      currentUser = data.name;
      $(".member-name").text(currentUser);
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
	  newTr.append("<td class = 'price' data-id='" + aItemData.id + "'>$ " + aItemData.price + "</td>");
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
	      	alert("choose a valid "+name+" quantity");
	      }     	
	   	}
    });
    console.log(orderArr);
    showConfirmScreen();
  });


});

// do something like this ^ to go through table rows, and get the sales inventory id and amount entered by customer
// for each checked item, put them in an array [{item id: 1, item quant: 4}, {item id: 3, item quant: 6}] etc.
// 	then creat a new table from this array for the "confirm customer order modal", then if they confirm order
// add that data to the order lines db table, and the customer/ order # info to the orders db table.