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

  // Get route for returning clocks of a specific category
  app.get("/api/clocks/category/:category", function(req, res) {
    db.Clock
      .findAll({
        where: {
          category: req.params.category
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get rotue for retrieving a single post
  app.get("/api/clocks/:id", function(req, res) {
    db.Clock
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbClock) {
        res.json(dbClock);
      });
  });

  // Clock route for saving a new Clock
  app.post("/api/clock", function(req, res) {
    console.log(req.body);
    db.Clock
      .create({
        clockIn: req.body.clockIn,
        clockOut: req.body.clockOut,
        totalTime: req.body.totalTime,
        isActive: true
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
};
