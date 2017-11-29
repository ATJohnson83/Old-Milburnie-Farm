$(document).ready(function() {

	$(document).on("click", "div.list-group",viewTask);
	$(document).on("click", "button.goback",showTasks);
  $(document).on("click", "button.close_task",closeTask);
  
  loggedInUser();
  showTasks();

  function loggedInUser(){
    $.get("/api/user_data").then(function(data) {
      getTasks(data.id);
    });
  };

  function showTasks(){
  	$("#task_list").show();
  	$('#task_view').hide();
  };

  function showTask(){
  	$("#task_list").hide();
  	$('#task_view').show();
  };

  function getTasks(id) {
  	$("#task_list").empty();
    $.get("/api/tasks/"+id, function(data) {
      console.log("db Data: " + JSON.stringify(data));
      for (var i = 0; i < data.length; i++) {
        var new_task = $("<div class='list-group' data-id='"+data[i].id+"'>");
        new_task.append("<h3 class='list-group-item-heading'>"+data[i].name+"</h3>");
        new_task.append("<h4 class='list-group-item-text'>"+data[i].openDate+"</h4>");
        new_task.append("</div>");
        $("#task_list").append(new_task);
      }
    });
  };

  function viewTask(){
  	$('#task_view').empty();
  	var taskid = $(this).data('id');
  	$.get("/api/task/"+taskid, function(data) {
  		var task_view = $("<div>");
  		task_view.append("<h3 class='list-group-item-heading'>"+data.name+"</h3>");
  		task_view.append("<h4 class='list-group-item-text'>"+data.openDate+"</h4>");
  		task_view.append("<p class='list-group-item-text'>"+data.description+"</p>");
  		task_view.append("<button class='goback btn btn-primary'>Go Back</button>");
  		task_view.append("<button class='close_task btn btn-danger' data-id='"+data.id+"'>Close Task</button>");
  		$('#task_view').append(task_view);
  		showTask();
 	  });
  };

  function closeTask (event){
  	alert('close task');
    event.stopPropagation();
    var date = new Date();
    var closeDate = moment(date).format('YYYY-MM-DD');
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/closetask/"+closeDate+"/"+ id
    }).done(getTasks,showTasks);
  }


});