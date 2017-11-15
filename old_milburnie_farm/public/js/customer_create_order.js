$(document).ready(function() {

	getSalesInventory()

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
	  var newTr = $('<tr>');
	  newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.name + "</td>");
	  newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.quantity + "</td>");
	  newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.unit + "</td>");
	  newTr.append("<td data-id='" + aItemData.id + "'>$ " + aItemData.price + "</td>");
	  newTr.append("<td>|</td>");
	  newTr.append("<td><input type='checkbox'></td>");
	  newTr.append("<td><input type='text'></td>");
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

});



// $('#save').click(function () {
//     $('#mytable').find('tr').each(function () {
//         var row = $(this);
//         if (row.find('input[type="checkbox"]').is(':checked') &&
//             row.find('textarea').val().length <= 0) {
//             alert('You must fill the text area!');
//         }
//     });
// });

// do something like this ^ to go through table rows, and get the sales inventory id and amount entered by customer
// for each checked item, put them in an array [{item id: 1, item quant: 4}, {item id: 3, item quant: 6}] etc.
// 	then creat a new table from this array for the "confirm customer order modal", then if they confirm order
// add that data to the order lines db table, and the customer/ order # info to the orders db table.