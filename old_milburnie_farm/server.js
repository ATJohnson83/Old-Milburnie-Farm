var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/Users-api-routes.js")(app);

require("./routes/Tasks-api-routes.js")(app);
require("./routes/Sales-Inventories-api-routes.js")(app);
require("./routes/Orders-api-routes.js")(app);
require("./routes/login-api-routes.js")(app);
require("./routes/Order-Lines-api-routes.js")(app);




db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// db.sequelize.sync({force: true})
 //deletes db & tables on load