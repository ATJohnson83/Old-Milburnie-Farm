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
  // GET route for getting all of the order_lines
  app.get("/api/order_lines/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for returning order_lines of a specific category by id
  app.get("/api/order_lines/:id", function(req, res) {
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
  app.get("/api/order_lines/:id", function(req, res) {
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
  app.post("/api/order_lines", function(req, res) {
    console.log(req.body);
    db.Post
      .create({
        order_num: req.body.order_num,
        name: req.body.name,
        type: req.body.type,
        Quantity: req.body.Quantity,
        Unit: req.body.Unit,
        Price : req.body.Price
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting order_lines
  app.delete("/api/order_lines/:id", function(req, res) {
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

  // PUT route for updating order_lines
  app.put("/api/order_lines", function(req, res) {
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
