// $('#save').click(function () {
//     $('#mytable').find('tr').each(function () {
//         var row = $(this);
//         if (row.find('input[type="checkbox"]').is(':checked') &&
//             row.find('textarea').val().length <= 0) {
//             alert('You must fill the text area!');
//         }
//     });
// });

// do something like this ^ to go through table rows, and get the sales inventory id and amount entered by customer
// for each checked item, put them in an array [{item id: 1, item quant: 4}, {item id: 3, item quant: 6}] etc.
// 	then creat a new table from this array for the "confirm customer order modal", then if they confirm order
// add that data to the order lines db table, and the customer/ order # info to the orders db table.