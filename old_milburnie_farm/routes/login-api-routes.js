var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app){

  app.post("/api/login/customer", passport.authenticate("local"), function(req, res) {
    console.log("user login info: " +req.user.dataValues.name);
    res.json("/customer_main");
  });

  app.post("/api/login/employee", passport.authenticate("local"), function(req, res) {
    res.json("/employee_main");
  });

  app.post("/api/login/mgmt", passport.authenticate("local"), function(req, res) {
    res.json("/mgmt_main");
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's name 
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        id: req.user.id
      });
    }
  });

};