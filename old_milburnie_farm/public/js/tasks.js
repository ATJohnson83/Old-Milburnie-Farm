$(document).ready(function() {

  var name = $('#name');
  var employee = $('#employee');
  var OpenDate = $('#startDate');
  var CloseDate = $('#closeDate');
  var Description = $('#description');
  var isActive = $('#isActive');
 var activeTaskList = $("#acttasks");
 var deactiveTaskList = $("#deacttasks");

 $("#cancel").click(function(){
   $("#name").val('');
   $("#startDate").val('');
   $("#closeDate").val('');
   $("#description").val("");
   $("#isActive").val('');
 });
  
  $("#save").click(addTasks);
  $(document).on("click", "button.user_deactivate",deactivateTask);
  $(document).on("click", "button.user_activate",activateTask);
  $(document).on("click", "button.user_delete",deleteTask);
  
  getTasks();

  function resetList(){
    console.log(`reset list called`);
    activeTaskList.empty();
    deactiveTaskList.empty();
    getTasks();
  };

  function getTasks() {
    console.log(`get tasks called`);
    $.get("/api/tasks", function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].active == true) {
          createActiveTaskRow(data[i]);
        } else {
          createDeactiveTaskRow(data[i]);
        }
      }
    });
  }

  function addTasks(event) {
    console.log(`add tasks called`);
    event.preventDefault(); 
    var newTask = {
      name: name.val().trim(),
      employee: employee.val().trim(),
      OpenDate: OpenDate.val().trim(),
      CloseDate: CloseDate.val().trim(),
      Description : Description.val().trim(),
      active : true
    };
    console.log(newTask);
    $.post("/api/tasks",newTask,resetList);
    console.log(newTask, resetList);
  };

  function createActiveTaskRow(aTasksData){
    console.log(`create task row called`);
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.name + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.employee + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.OpenDate + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.CloseDate + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.Description + "</td>");
    newTr.append("<td><button data-id='"+aTasksData.id+"' class='user_deactivate btn btn-primary glyphicon glyphicon-hand-down'></button></td>");
    newTr.append("</tr>");
    activeTaskList.prepend(newTr);
  }

  
  function createDeactiveTaskRow(dTaskData){
    console.log(`create deactive class row called ${dTaskData.name}`);
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.name + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.employee + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.OpenDate + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.CloseDate + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.Description + "</td>");
    newTr.append("<td><button data-id='"+dTaskData.id+"' class='user_activate btn btn-primary glyphicon glyphicon-hand-up'></button></td>");
    newTr.append("<td><button data-id='"+dTaskData.id+"' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>");
    newTr.append("</tr>");
    deactiveTaskList.prepend(newTr);
  }

  function deactivateTask (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/tasks/deactivate/" + id
    }).done(resetList);
  }

  function activateTask (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/tasks/activate/" + id
    }).done(resetList);
  }

  function deleteTask(event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/tasks/" + id
    }).done(resetList);
  }

});
