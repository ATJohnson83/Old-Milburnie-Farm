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
  // GET route for getting all of the harvests
  app.get("/api/harvests", function(req, res) {
    db.Harvest.findAll({}).then(function(dbHarvest) {
      res.json(dbHarvests);
    });
  });

  // Get route for returning Harvests of a specific category by id
  app.get("/api/harvests/:id", function(req, res) {
    db.Harvest
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get rotue for retrieving a single Harvest
  app.get("/api/harvests/:id", function(req, res) {
    db.Harvest
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbHarvest) {
        res.json(dbHarvest);
      });
  });

  // POST route for saving a new post
  app.post("/api/harvests", function(req, res) {
    console.log(req.body);
    db.Harvest
      .create({
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        field: req.body.field,
        bed: req.body.bed,
        quantity: req.body.quantity,
        active: true
      })
      .then(function(dbHarvest) {
        res.json(dbHarvest);
      });
  });

  app.delete("/api/harvests/:id", function(req, res) {
    db.Harvest
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbharvests) {
        res.json(dbharvests);
      });
  });

  app.put("/api/harvests/deactivate/:id", function(req, res) {
    db.Harvest
      .update(
        {
          active: false
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbHarvests) {
        res.json(dbHarvests);
      });
  });

  app.put("/api/harvests/activate/:id", function(req, res) {
    db.Harvest
      .update(
        {
          active: true
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbHarvests) {
        res.json(dbHarvests);
      });
  });
};
