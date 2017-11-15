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
  // GET route for getting all of the tasks
  app.get("/api/tasks/", function(req, res) {
    db.Task.findAll({}).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // Get route for returning tasks of a specific category by id
  app.get("/api/tasks/:id", function(req, res) {
    db.Post
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get rotue for retrieving a single Task
  app.get("/api/task/:id", function(req, res) {
    db.Task
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // POST route for saving a new post
  app.post("/api/tasks", function(req, res) {
    console.log(req.body);
    db.Task
      .create({
      name: req.body.name,
      employee: req.body.employee,
      OpenDate: req.body.OpenDate,
      CloseDate: req.body.CloseDate,
      Description : req.body.Description,
      Active : req.body.isActive
      })
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // DELETE route for deleting tasks
  app.delete("/api/tasks/:id", function(req, res) {
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

  // PUT route for updating tasks
  app.put("/api/tasks", function(req, res) {
    db.Task
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
