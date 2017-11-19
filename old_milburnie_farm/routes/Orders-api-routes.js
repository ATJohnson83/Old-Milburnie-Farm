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
  // GET route for getting all of the orders
  app.get("/api/orders/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for returning orders of a specific category by id
  app.get("/api/orders/:id", function(req, res) {
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
  app.get("/api/orders/:id", function(req, res) {
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

  app.post("/api/orders", function(req, res) {
    console.log(req.body);
    db.Orders.create(req.body).then(function(dbOrders) {
        res.json(dbOrders);
      });
  });

  // DELETE route for deleting orders
  app.delete("/api/orders/:id", function(req, res) {
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

  // PUT route for updating orders
  app.put("/api/orders", function(req, res) {
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
