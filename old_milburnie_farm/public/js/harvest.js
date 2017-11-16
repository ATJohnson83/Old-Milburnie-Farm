$(document).ready(function() {
  var date = $("#date");
  var type = $("#type");
  var name = $("#name");
  var field = $("#field");
  var bed = $("#bed");
  var quantity = $("#quantity")
  var activeHarvestList = $("#activeharvest");
  var deactiveHarvestList = $("#deacivetharvest");

  $("#cancel").click(function() {
    console.log(`cancel clicked`);
    $("#date").val("");
    $("#type").val("");
    $("#name").val("");
    $("#bed").val("");
    $("#field").val("");
  });

  $("#addHarvest").click(addHarvest);
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

  function createActiveTaskRow(aharvestData) {
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
    activeTaskList.prepend(newTr);
  }

  function createDeactiveTaskRow(dTaskData) {
    console.log(dTaskData);
    console.log(
      dTaskData.name,
      dTaskData.employee,
      dTaskData.OpenDate,
      dTaskData.CloseDate,
      dTaskData.Description,
      dTaskData.id
    );
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.name + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.employee + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.OpenDate + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.CloseDate + "</td>"
    );
    newTr.append(
      "<td data-id='" + dTaskData.id + "'>" + dTaskData.Description + "</td>"
    );
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
    deactiveTaskList.prepend(newTr);
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
});
