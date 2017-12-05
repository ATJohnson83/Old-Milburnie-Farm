$(document).ready(function() {

  var userName = $('#user-name');
  var userType = $('#user-type');
  var userUname = $('#user-username');
  var userPass = $('#user-password');
  var activeUserList = $('#actusrtb');
  var deactiveUserList = $('#deactusrtb');

  $("#adduser").click(addUser);
  $(document).on("click", "button.user_deactivate",deactivateUser);
  $(document).on("click", "button.user_activate",activateUser);
  $(document).on("click", "button.user_delete",deleteUser);
  $(document).on("click", "button.user_password", showPassword);
  getUsers();

  function resetList(){
    activeUserList.empty();
    deactiveUserList.empty();
    getUsers();
  };

  function getUsers(){
    $.get("/api/users", function(data){     
      for (var i = 0; i < data.length; i++) {
        if(data[i].active == true){
          createActiveUserRow(data[i]);
        }
        else{
          createDeactiveUserRow(data[i]);
        }
      };
    });
  };

  function addUser(event) {
    event.preventDefault(); 
    var newUser = {
      name: userName.val().trim(),
      type: userType.val().trim(),
      username: userUname.val().trim(),
      password: userPass.val().trim()
    }
    $.post("/api/users",newUser,resetList);
  }

  function createActiveUserRow(aUserData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + aUserData.id + "'>" + aUserData.name + "</td>");
    newTr.append("<td data-id='" + aUserData.id + "'>" + aUserData.type + "</td>");
    newTr.append("<td data-id='" + aUserData.id + "'>" + aUserData.username + "</td>");
    newTr.append("<td><button data-password='"+aUserData.password+"'data-id='"+aUserData.id+"' type='button' class='user_password btn btn-primary glyphicon glyphicon-modal-window' data-toggle='modal' data-target='.bs-example-modal-sm'></button></td>");
    newTr.append("<td><button data-id='"+aUserData.id+"' class='user_deactivate btn btn-primary glyphicon glyphicon-hand-down'></button></td>");
    newTr.append("</tr>");
    activeUserList.append(newTr);
  }

  
  function createDeactiveUserRow(dUserData){
    var newTr = $('<tr>');
    newTr.append("<td data-id='" + dUserData.id + "'>" + dUserData.name + "</td>");
    newTr.append("<td data-id='" + dUserData.id + "'>" + dUserData.type + "</td>");
    newTr.append("<td><button data-id='"+dUserData.id+"' class='user_activate btn btn-primary glyphicon glyphicon-hand-up'></button></td>");
    newTr.append("<td><button data-id='"+dUserData.id+"' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>");
    newTr.append("</tr>");
    deactiveUserList.append(newTr);
  }

  function deactivateUser (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/users/deactivate/" + id
    }).done(resetList);
  }

  function activateUser (event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/users/activate/" + id
    }).done(resetList);
  }

  function deleteUser(event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    }).done(resetList);
  }

  function showPassword (event){
    event.stopPropagation();
    var password = $(this).data("password");
    $('.modal-password').text(password);
  }


});
