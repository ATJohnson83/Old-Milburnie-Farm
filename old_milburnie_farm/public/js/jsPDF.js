// var jsPDF = require('jsPDF');




$("#submit").click(function () {
    console.log(`clicked`);
    
});





var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    },
    '.controls' : function (element, renderer) {
        return true;
    }
};
//print managment harvest
$('#printMgmtHarvest').click(function () {   
    html2canvas($(".container"), {
            background : "#ffffff",
            onrendered: function(canvas) {      
                var imgData = canvas.toDataURL(
                    'image/jpeg');              
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'jpeg', 10, 10);
                doc.save('harvest.pdf');
            }
        })
    
});
//print management time
$("#printMgmtTime").click(function() {
    console.log(`clicked`);
  html2canvas($(".employee-main"), {
    background: "#ffffff",
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL("image/jpeg");
      var doc = new jsPDF("p", "mm");
      doc.addImage(imgData, "jpeg", 10, 10);
      doc.save("time.pdf");
    }
  });
});

//print management taks
$("#printMgmtTasks").click(function() {
  console.log(`clicked`);
  html2canvas($("#mgmtTasks"), {
    background: "#ffffff",
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL("image/jpeg");
      var doc = new jsPDF("p", "mm");
      doc.addImage(imgData, "jpeg", 10, 10);
      doc.save("mgmtTasks.pdf");
    }
  });
});

//print employee active tasks

$("#printEmployeeTasks").click(function() {
  console.log(`clicked`);
  html2canvas($("#employeeTasks"), {
    background: "#ffffff",
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL("image/jpeg");
      var doc = new jsPDF("p", "mm");
      doc.addImage(imgData, "jpeg", 10, 10);
      doc.save("employeeTasks.pdf");
    }
  });
});

//print employee active Harvest

$("#printEmployeeHarvest").click(function() {
  console.log(`clicked`);
  html2canvas($("#employeeHarvest"), {
    background: "#ffffff",
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL("image/jpeg");
      var doc = new jsPDF("p", "mm");
      doc.addImage(imgData, "jpeg", 10, 10);
      doc.save("employeeHarvest.pdf");
    }
  });
});

