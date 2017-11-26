
var db = require("../models");


module.exports = function(app) {

  app.get("/api/orders/", function(req, res) {
    db.Orders.findAll({include: [db.Users]}).then(function(dbOrders) {
      res.json(dbOrders);
    });
  });


  app.get("/api/orders/:id", function(req, res) {
    db.Orders
      .findAll({
        where: {
          UserId: req.params.id
        }
      })
      .then(function(dbOrders) {
        res.json(dbOrders);
      });
  });

  app.get("/api/order/:id", function(req, res) {
    db.Orders
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbOrder) {
        res.json(dbOrder);
      });
  });

  app.post("/api/orders", function(req, res) {
    console.log(req.body);
    db.Orders.create(req.body).then(function(dbOrders) {
        res.json(dbOrders);
      });
  });


  app.delete("/api/orders/:id", function(req, res) {
    db.Orders
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbOrders) {
        res.json(dbOrders);
      });
  });


  app.put("/api/orders", function(req, res) {
    db.Orders
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbOrders) {
        res.json(dbOrders);
      });
  });

};
