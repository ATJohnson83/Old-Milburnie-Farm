var db = require("../models");

module.exports = function(app) {

	app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

	app.post("/api/users", function(req, res) {
    db.Users.create({
      name: req.body.name,
      type: req.body.type,
      username: req.body.username,
      password: req.body.password,
      active: true
    }).then(function(dbUsers) {  
      res.json(dbUsers);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/api/users/deactivate/:id", function(req, res) {
    db.Users.update({
      active: false
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/api/users/activate/:id", function(req, res) {
    db.Users.update({
      active: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

};