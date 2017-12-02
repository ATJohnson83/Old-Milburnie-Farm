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
    db.Task.findAll({include: [db.Users]}).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  // Get route for returning tasks of a specific category by id
  app.get("/api/tasks/:id", function(req, res) {
    db.Task
      .findAll({
        where: {
          UserId: req.params.id,
          closeDate: null
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

  app.post("/api/tasks", function(req, res) {
    console.log(req.body);
    db.Task.create(req.body).then(function(dbTasks) {
        res.json(dbTasks);
      });
  });

    app.delete("/api/task/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  app.put("/api/closetask/:closeDate/:id", function(req, res) {
    db.Task.update({
      closeDate: req.params.closeDate
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  app.put("/api/opentask/:id", function(req, res) {
    db.Task.update({
      closeDate: null
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });
};
