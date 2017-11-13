
$("#submit").click(function () {
    console.log(`clicked`);
    
});

// 1. create jsPDF object:
doc = new jsPDF()
 
// 2. put something interesting in there:
doc.setFontSize(22)
doc.text(20, 20, 'This is a title')
doc.setFontSize(16)
doc.text(20, 30, 'This is some normal sized text underneath.')

var string = doc.output('datauristring');
var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close()