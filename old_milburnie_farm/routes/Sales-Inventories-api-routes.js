var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/sales_inventory", function(req, res) {
    db.Sales_Inventory.findAll({}).then(function(dbSlsinv) {
      res.json(dbSlsinv);
    });
  });

  app.get("/api/sales_inventory/:id", function(req, res) {
    db.Sales_Inventory
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbSlsinv) {
        res.json(dbSlsinv);
      });
  });

  app.get("/api/sales_inventory/:id", function(req, res) {
    db.Sales_Inventory
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbSlsinv) {
        res.json(dbSlsinv);
      });
  });

  app.post("/api/sales_inventory", function(req, res) {
    console.log(req.body);
    db.Sales_Inventory
      .create({
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity,
        unit: req.body.unit,
        price: req.body.price,
        active: true
      })
      .then(function(dbSlsinv) {
        res.json(dbSlsinv);
      });
  });

  app.delete("/api/sales_inventory/:id", function(req, res) {
    db.Sales_Inventory.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSlsinv) {
      res.json(dbSlsinv);
    });
  });

  app.put("/api/sales_inventory/deactivate/:id", function(req, res) {
    db.Sales_Inventory.update({
      active: false
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbSlsinv) {
      res.json(dbSlsinv);
    });
  });

  app.put("/api/sales_inventory/activate/:id", function(req, res) {
    db.Sales_Inventory.update({
      active: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbSlsinv) {
      res.json(dbSlsinv);
    });
  });


};
