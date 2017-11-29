$(document).ready(function() {

  var name = $('#name');
  var employee = $('#employeeList');
  var description = $('#description');
  var openTaskList = $("#opentasks");
  var closedTaskList = $("#closedtasks");


  $("#cancel").click(clearForm);  
  $("#add_task").click(addTasks);
  $(document).on("click", "button.close_task",closeTask);
  $(document).on("click", "button.open_task",openTask);
  $(document).on("click", "button.delete_task",deleteTask);
  
  getEmployees();
  getTasks();

  function clearForm(){
   name.val('');
   description.val('');
   employee.val('');
  };

  function getEmployees(){
    $.get("/api/users/employees", function(data){
      for (var i = 0; i < data.length; i++) {
        employeeList(data[i]);
      }
    });
  };

  function employeeList(data){
    var option = "<option data-id='"+data.id+"'>"+data.name+"</option>";
    $("#employeeList").append(option);
  }

  function resetList(){
    openTaskList.empty();
    closedTaskList.empty();
    getTasks();
  };

  function getTasks() {
    console.log(`get tasks called`);
    $.get("/api/tasks", function(data) {
      console.log("db Data: " + JSON.stringify(data));
      for (var i = 0; i < data.length; i++) {
        if (data[i].closeDate == null) {
          createOpenTaskRow(data[i]);
        } else {
          createClosedTaskRow(data[i]);
        }
      }
    });
  }

  function addTasks(event) {
    event.preventDefault(); 
    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD');
    var newTask = {
      name: name.val().trim(),
      UserId: employee.find(':selected').data('id'),
      openDate: formattedDate,
      description : description.val().trim(),
    };
    $.post("/api/tasks",newTask,resetList);
    clearForm();
  };

  function createOpenTaskRow(aTasksData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.name + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.User.name + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.openDate + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.description + "</td>");
    newTr.append("<td><button data-id='"+aTasksData.id+"' class='close_task btn btn-primary glyphicon glyphicon-hand-down'></button></td>");
    newTr.append("</tr>");
    openTaskList.prepend(newTr);
  }

  
  function createClosedTaskRow(dTaskData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.name + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.User.name + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.openDate + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.closeDate + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.cescription + "</td>");
    newTr.append("<td><button data-id='"+dTaskData.id+"' class='open_task btn btn-primary glyphicon glyphicon-hand-up'></button></td>");
    newTr.append("<td><button data-id='"+dTaskData.id+"' class='delete_task btn btn-danger glyphicon glyphicon-remove'></button></td>");
    newTr.append("</tr>");
    closedTaskList.prepend(newTr);
  }

  function closeTask (event){
    event.stopPropagation();
    var date = new Date();
    var closeDate = moment(date).format('YYYY-MM-DD');
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/closetask/"+closeDate+"/"+ id
    }).done(resetList);
  }

  function openTask (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/opentask/" + id
    }).done(resetList);
  }

  function deleteTask(event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/task/" + id
    }).done(resetList);
  }

});
