// var jsPDF = require('jsPDF');




$("#submit").click(function () {
    console.log(`clicked`);
    
});





var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#printMgmtHarvest').click(function () {   
    doc.fromHTML($('#activeHarvest').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
});

