// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the clocks
  app.get("/api/clock", function(req, res) {
    db.Clock.findAll({}).then(function(dbClock) {
      res.json(dbClock);
    });
    
  });

  app.get("/api/employees", function(req, res) {
      db.Users.findAll({}).then(function(dbUsers) {
        res.json(dbUsers);
      });
    });

    // Get route for returning Clock of a specific category by id
  app.get("/api/clocks/:id", function(req, res) {
    db.Clock
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbClock) {
        res.json(dbClock);
      });
  });

    // Get rotue for retrieving a single Clock
  app.get("/api/clocks/:id", function(req, res) {
    db.Clock
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbClocks) {
        res.json(dbClocks);
      });
  });


  // Clock route for saving a new Clock
  app.post("/api/clocks", function(req, res) {
    console.log(req.body);
    db.Clock
      .create({
        clockIn: req.body.clockIn,
        clockOut: req.body.clockOut,
        total: req.body.total,
        username: req.body.username
      })
      .then(function(dbClock) {
        res.json(dbClock);
      });
  });

  // DELETE route for deleting clocks
  app.delete("/api/clocks/:id", function(req, res) {
    db.Clock
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbClock) {
        res.json(dbClock);
      });
  });

  
 
  // PUT route for updating clocks
  app.put("/api/clocks", function(req, res) {
    db.Clock
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbClock) {
        res.json(dbClock);
      });
  });

  //updating the clockOut time
   app.put("/api/clocks/:name?", function(req, res) {
     db.Harvest.update(
       { clockOut: {clockOut : req.params.clockOut} }, 
       { where: { total: req.params.total } })
       .then(
       function(dbClocks) {
         res.json(dbClocks);
       }
     );
   });
};


