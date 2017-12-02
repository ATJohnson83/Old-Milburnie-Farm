var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/order_lines/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  
  app.get("/api/order_lines/:id", function(req, res) {
    db.Order_Lines
      .findAll({
        where: {
          OrderId: req.params.id
        }
      })
      .then(function(dbOlines) {
        res.json(dbOlines);
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
    db.Order_Lines.create(req.body).then(function(dbOlines) {
        res.json(dbOlines);
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
