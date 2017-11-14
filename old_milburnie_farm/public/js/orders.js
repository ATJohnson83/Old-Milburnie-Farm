$(document).ready(function() {

      $("#order").click(function(){
     console.log(`order clicked`);
    order()
  });
 
  var order = () => {
    console.log(`order works`)
     var meatName = $("#meat-Name").val;
     var meatQuantity = $("#meat-Quantity").val;
     var meatUnits = $("#meat-Units").val;
     var meatPrice = $("#meat-Price").val;

     var vegName = $("#veg-Name").val;
     var vegQuantity = $("#veg-Quantity").val;
     var vegUnits = $("#veg-Units").val;
     var vegPrice = $("#veg-Price").val;

     var lettucetName = $("#lettuce-Name").val;
     var lettuceQuantity = $("#lettuce-Quantity").val;
     var lettuceUnits = $("#lettuce-Units").val;
     var lettucePrice = $("#lettuce-Price").val;
    }
})