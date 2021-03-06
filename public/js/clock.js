$(document).ready(function() {
  var totalTime = $("#totalTime");
  var clockInTime = $("#clockInTime");
  var clockOutTime = $("#clockOutTime");
  var totalTimeWorked = $("#clockOutBtn");
  var activeTimeList = $("#activeTime");
  var deactiveTime = $("#deactiveTime");
  let currentTime = moment().format("hh:mm");

  var thisUser = $(".member-name");

  loggedInUser();

  function loggedInUser() {
    $.get("/api/user_data").then(function(data) {
      console.log(data);
      thisUser.text(data.name);
      thisUser.attr("value", data.id);
    });
  }

  $(document).on("click", "button.user_delete", deleteTime);
  $(document).on("click", "button.totalTimeWorked", totalTime);

  $("#currentTime").html(currentTime);

  //get time function on page load
  getTime();

  //reset list gets called afted add Time
  function resetList() {
    console.log(`reset list called`);
    activeTimeList.empty();
    clockOutTime.empty();
    getTime();
  }
  //get time called after reset list
  function getTime() {
    console.log(`get time called`);
    $.get("/api/clock", function(data) {
      console.log(data);

      //register clock in time

      $("#clockInBtn").click(function() {
        clockIn = moment();
        alert(
          `Clocked in on ${clockIn.format("MM-DD")} at ${clockIn.format(
            "hh:mm"
          )}`
        );
      });

      //register clock out time

      $("#clockOutBtn").click(function() {
        clockOut = moment();
        date = moment().format("MM-DD");
        alert(
          `Clocked out on  ${clockOut.format("hh:mm")} at ${clockOut.format(
            "MM-DD"
          )}`
        );

        addTime();
      });

      for (var i = 0; i < data.length; i++) {
        createActiveTimeRow(data[i]);
      }
    });
  }

  //function to add total time
  function addTime(event) {
    var newTime = {
      clockIn: clockIn.format("hh:mm"),
      clockOut: clockOut.format("hh:mm"),
      total: clockOut.diff(clockIn, "minutes"),
      username: thisUser[0].innerText,
      date: date
    };
    console.log(newTime);
    $.post("/api/clocks", newTime, resetList);
  }

  function createActiveTimeRow(aTimeData) {
    console.log(`create time row called`);
    console.log(aTimeData);
    var newTr = $("<tr>");
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.date + "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.clockIn + "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.clockOut + "</td>"
    );
    newTr.append(
      "<td data-id='" +
        aTimeData.id +
        "'>" +
        aTimeData.total +
        " minutes" +
        "</td>"
    );
    newTr.append(
      "<td data-id='" + aTimeData.id + "'>" + aTimeData.username + "</td>"
    );

    newTr.append(
      "<td><button data-id='" +
        aTimeData.id +
        "' class='user_delete btn btn-danger glyphicon glyphicon-remove'></button></td>"
    );

    newTr.append("</tr>");
    activeTimeList.prepend(newTr);
  }

  function deleteTime(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/clocks/" + id
    }).done(resetList);
  }
}); //close document ready function
