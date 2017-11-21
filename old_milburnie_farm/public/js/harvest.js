$(document).ready(function() {
  var date = $("#date");
  var type = $("#type");
  var name = $("#name");
  var field = $("#field");
  var bed = $("#bed");
  var quantity = $("#quantity")
  var activeHarvestList = $("#activeHarvest");
  var trackHarvest = $("#trackHarvest");
  var deactiveHarvestList = $("#deactiveHarvest");
  var trackActiveHarvest = $("#activeHarvest");

  $("#cancel").click(function() {
    console.log(`cancel clicked`);
    $("#date").val("");
    $("#type").val("");
    $("#name").val("");
    $("#bed").val("");
    $("#field").val("");
  });

  $("#addHarvest").click(addHarvest);
  $("#getActiveHarvest").click(trackHarvest);

  $(document).on("click", "button.trackHarvest", trackHarvest);
  $(document).on("click", "button.addHarvest", activateHarvest);
  $(document).on("click", "button.getActiveHarvest", trackHarvest);


  $(document).on("click", "button.user_deactivate", deactivateHarvest);
  $(document).on("click", "button.user_activate", activateHarvest);
  $(document).on("click", "button.user_delete", deleteHarvest);

  getHarvest();

  function resetList() {
    console.log(`reset list called`);
    activeHarvestList.empty();
    deactiveHarvestList.empty();
    getHarvest();
  }

  function getHarvest() {
    console.log(`get harvest called`);
   $.get("/api/harvests", function(data){  
       console.log(data);
      for (var i = 0; i < data.length; i++) {
        if(data[i].active == true){
          createActiveHarvestRow(data[i]);
        }
        else{
          createDeactiveHarvestRow(data[i]);
        }
      };
    });
  };
  
  function addHarvest(event) {
    console.log(`add harvest called`);
    event.preventDefault();
    var newHarvest = {
      date: date.val().trim(),
      type: type.val().trim(),
      name: name.val().trim(),
      field: field.val().trim(),
      bed: bed.val().trim(),
      quantity: quantity.val().trim(),
      
    };
    console.log(newHarvest);
    $.post("/api/harvests", newHarvest, resetList);
    console.log(newHarvest, resetList);
  }

  function createActiveHarvestRow(aharvestData) {
    console.log(`create task row called`);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.date + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.type + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.name + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.field + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.bed + "</td>"
    );
    newTr.append(
        "<td data-id='" + aharvestData.id + "'>" + aharvestData.quantity + "</td>");
    newTr.append(
      "<td><button data-id='" +
        aharvestData.id +
        "' class='user_deactivate btn btn-primary glyphicon glyphicon-hand-down'></button></td>"
    );
    newTr.append("</tr>");
    activeHarvestList.prepend(newTr);
  }

  function createDeactiveHarvestRow(dTaskData) {
    console.log(dTaskData);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.date + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.type + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.name + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.field + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.bed + "</td>"
    );
     newTr.append (
     "<td data-id='" + dTaskData.id + "'>" + dTaskData.quantity + "</td>");
    newTr.append(
      "<td><button data-id='" +
        dTaskData.id +
        "' class='user_activate btn btn-primary glyphicon glyphicon-hand-up'></button></td>"
    );
    newTr.append(
      "<td><button data-id='" +
        dTaskData.id +
        "' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>"
    );
    newTr.append("</tr>");
    deactiveHarvestList.prepend(newTr);
  }

  function deactivateHarvest(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/harvests/deactivate/" + id
    }).done(resetList);
  }

  function activateHarvest(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/harvests/activate/" + id
    }).done(resetList);
  }

  function deleteHarvest(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/harvests/" + id
    }).done(resetList);
  }


//Managment Harvest Tasks --------------------------------------------------------------------------
    function trackHarvest() {
    console.log(`track harvest called`);
   $.get("/api/harvests/track", function(data){  
       console.log(data);
      for (var i = 0; i < data.length; i++) {
        if(data[i].active == true){
          createTrackHarvestRow(data[i]);
        }
        else{
          createUntrackedHarvestRow(data[i]);
        }
      };
    });
  };

   function createTrackHarvestRow(aharvestData) {
    console.log(`create task row called`);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.id + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.createdAt + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.type + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.field + "</td>"
    );
    newTr.append(
      "<td data-id='" + aharvestData.id + "'>" + aharvestData.bed + "</td>"
    );
    newTr.append(
        "<td data-id='" + aharvestData.id + "'>" + aharvestData.quantity + "</td>"
      );
         newTr.append(
        "<td data-id='" + aharvestData.id + "'>" + aharvestData.name + "</td>"
      );
    newTr.append(
      "<td><button data-id='" +
        aharvestData.id +
        "' class='user_deactivate btn btn-primary glyphicon glyphicon-hand-down'></button></td>"
    );
    newTr.append("</tr>");
    trackHarvestList.prepend(newTr);
  }

  function createUntrackedHarvestRow(dTaskData) {
    console.log(dTaskData);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.date + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.type + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.name + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.field + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.bed + "</td>"
    );
     newTr.append (
     "<td data-id='" + dTaskData.id + "'>" + dTaskData.quantity + "</td>");
    newTr.append(
      "<td><button data-id='" +
        dTaskData.id +
        "' class='user_activate btn btn-primary glyphicon glyphicon-hand-up'></button></td>"
    );
    newTr.append(
      "<td><button data-id='" +
        dTaskData.id +
        "' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>"
    );
    newTr.append("</tr>");
    untrackedHarvestList.prepend(newTr);
  }

//Query Harvests ------------------------------------------------------
$("#trackHarvest").click(function(event){
   event.preventDefault();
   $.get('/api/harvests/:name?/:type?/createdAt?/:updatedAt?', function(data) {
     console.log(data);
   })
})
  
});
