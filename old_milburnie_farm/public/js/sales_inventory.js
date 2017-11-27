$(document).ready(function() {

  var itemName = $('#slsinv-name');
  var itemType = $('#slsinv-type');
  var itemQuantity = $('#slsinv-qnty');
  var itemUnit = $('#slsinv-unit');
  var itemPrice = $('#slsinv-price');
  var activeItemList = $('#actslsinvtb');
  var deactiveItemList = $('#deactslsinvtb');

  $("#additem").click(addItem);
  $("#show_deac_inv").click(showDeactive);
  $("#show_act_inv").click(showActive);
  $(document).on("click", "button.item_deactivate",deactivateItem);
  $(document).on("click", "button.item_activate",activateItem);
  $(document).on("click", "button.item_delete",deleteItem);


  getSalesInventory();
  showActive();

  function showActive(){
    $("#actslsinv").show();
    $("#deactslsinv").hide();
  };

  function showDeactive(){
    $("#actslsinv").hide();
    $("#deactslsinv").show();
  }

  function resetList(){
    activeItemList.empty();
    deactiveItemList.empty();
    getSalesInventory();
  };

  function getSalesInventory(){
    $.get("/api/sales_inventory", function(data){ 
    console.log("db data: " + JSON.stringify(data));    
      for (var i = 0; i < data.length; i++) {
        if(data[i].active == true){
          createActiveItemRow(data[i]);
        }
        else{
          createDeactiveItemRow(data[i]);
        }
      };
    });
  };

  function addItem(event) {
    event.preventDefault(); 
    var newItem = {
      name: itemName.val().trim(),
      type: itemType.val().trim(),
      quantity: itemQuantity.val().trim(),
      unit: itemUnit.val().trim(),
      price: itemPrice.val().trim(),
    }
    console.log(JSON.stringify(newItem));
    $.post("/api/sales_inventory",newItem,resetList);
  }

  function createActiveItemRow(aItemData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.name + "</td>");
    newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.type + "</td>");
    newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.quantity + "</td>");
    newTr.append("<td data-id='" + aItemData.id + "'>" + aItemData.unit + "</td>");
    newTr.append("<td data-id='" + aItemData.id + "'>$ " + aItemData.price + "</td>");
    newTr.append("<td><button data-id='"+aItemData.id+"' class='item_deactivate btn btn-primary glyphicon glyphicon-hand-down'></button></td>");
    newTr.append("</tr>");

    switch (aItemData.type) {
      case "Chicken":
          $('#achickentb').append(newTr);
          break;
      case "Pork":
           $('#aporktb').append(newTr);
          break;
      case "Vegetable":
           $('#avegetabletb').append(newTr);
          break;
      case "Mushroom":
           $('#amushroomtb').append(newTr);
          break;
      case "Other":
           $('#aothertb').append(newTr);
          break;
    }
  }

  
  function createDeactiveItemRow(dItemData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + dItemData.id + "'>" + dItemData.name + "</td>");
    newTr.append("<td data-id='" + dItemData.id + "'>" + dItemData.type + "</td>");
    newTr.append("<td data-id='" + dItemData.id + "'>" + dItemData.quantity + "</td>");
    newTr.append("<td data-id='" + dItemData.id + "'>" + dItemData.unit + "</td>");
    newTr.append("<td data-id='" + dItemData.id + "'>$ " + dItemData.price + "</td>");
    newTr.append("<td><button data-id='"+dItemData.id+"' class='item_activate btn btn-primary glyphicon glyphicon-hand-up'></button></td>");
    newTr.append("<td><button data-id='"+dItemData.id+"' class='item_delete btn btn-danger glyphicon glyphicon-remove'></button></td>");
    newTr.append("</tr>");

    switch (dItemData.type) {
      case "Chicken":
          $('#dchickentb').append(newTr);
          break;
      case "Pork":
           $('#dporktb').append(newTr);
          break;
      case "Vegetable":
           $('#dvegetabletb').append(newTr);
          break;
      case "Mushroom":
           $('#dmushroomtb').append(newTr);
          break;
      case "Other":
           $('#dothertb').append(newTr);
          break;
    }
  }

  function deactivateItem (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/sales_inventory/deactivate/" + id
    }).done(resetList);
  }

  function activateItem (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/sales_inventory/activate/" + id
    }).done(resetList);
  }

  function deleteItem(event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/sales_inventory/" + id
    }).done(resetList);
  }

});