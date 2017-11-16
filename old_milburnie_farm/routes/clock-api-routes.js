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
  app.get("/api/clock/", function(req, res) {
    db.Clock.findAll({}).then(function(dbClock) {
      res.json(dbClock);
    });
  });

  // Get route for returning clocks of a specific category
  app.get("/api/clocks/category/:category", function(req, res) {
    db.Post
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
    db.Post
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/clocks", function(req, res) {
    console.log(req.body);
    db.Post
      .create({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting clocks
  app.delete("/api/clocks/:id", function(req, res) {
    db.Post
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating clocks
  app.put("/api/clocks", function(req, res) {
    db.Post
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
