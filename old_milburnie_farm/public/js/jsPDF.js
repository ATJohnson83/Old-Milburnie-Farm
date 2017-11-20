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

$('#printMgmtHarvest').click(function () {   
    // doc.fromHTML($('#harvests').get(0), 15, 15, {
    //     'width': 170,
    //         'elementHandlers': specialElementHandlers
    // });
    // doc.save('sample-file.pdf');

    html2canvas($("#harvests"), {
            background : "#ffffff",
            onrendered: function(canvas) {      
                var imgData = canvas.toDataURL(
                    'image/jpeg');              
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'jpeg', 10, 10);
                doc.save('sample-file.pdf');
            }
        })
    
});

