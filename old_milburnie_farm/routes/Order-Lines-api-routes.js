var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/order_lines/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  
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
