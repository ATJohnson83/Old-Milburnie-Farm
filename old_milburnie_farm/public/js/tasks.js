$(document).ready(function() {

  var name = $('#name');
  var employee = $('#employee');
  var OpenDate = $('#startDate');
  var CloseDate = $('#closeDate');
  var Description = $('#description');
  var isActive = $('#isActive');
  
  $("#save").click(addTasks);
  $(document).on("click", "button.user_deactivate",deactivateTask);
  $(document).on("click", "button.user_activate",activateTask);
  $(document).on("click", "button.user_delete",deleteTask);
  
  getTasks();

  function resetList(){
    activeTaskList.empty();
    deactiveTaskList.empty();
    getTasks();
  };

  function getTasks(){
    $.get("/api/tasks", function(data){     
      for (var i = 0; i < data.length; i++) {
        if(data[i].active == true){
          createActiveTaskRow(data[i]);
        }
        else{
          createDeactiveTaskRow(data[i]);
        }
      };
    });
  };

  function addTasks(event) {
    event.preventDefault(); 
    var newTask = {
      name: name.val().trim(),
      employee: employee.val().trim(),
      OpenDate: OpenDate.val().trim(),
      CloseDate: CloseDate.val().trim(),
      Description : Description.val().trim(),
      Active : isActive.val()
    }
    $.post("/api/users",newTask,resetList);
  };

  function createActiveTaskRow(aTasksData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.name + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.type + "</td>");
    newTr.append("<td data-id='" + aTasksData.id + "'>" + aTasksData.username + "</td>");
    newTr.append("<td><button data-id='"+aTasksData.id+"' type='button' class='user_password btn btn-primary glyphicon glyphicon-modal-window' data-toggle='modal' data-target='.bs-example-modal-sm'></button></td>");
    newTr.append("<td><button data-id='"+aTasksData.id+"' class='user_deactivate btn btn-primary glyphicon glyphicon-hand-down'></button></td>");
    newTr.append("</tr>");
    activeUserList.append(newTr);
  }

  
  function createDeactiveTaskRow(dTaskData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.name + "</td>");
    newTr.append("<td data-id='" + dTaskData.id + "'>" + dTaskData.type + "</td>");
    newTr.append("<td><button data-id='"+dTaskData.id+"' class='user_activate btn btn-primary glyphicon glyphicon-hand-up'></button></td>");
    newTr.append("<td><button data-id='"+dTaskData.id+"' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>");
    newTr.append("</tr>");
    deactiveTaskList.append(newTr);
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
