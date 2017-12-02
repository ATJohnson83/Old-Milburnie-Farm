var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(app) {

app.get("/api/harvests/:sdate?/:edate?", function(req, res) {
  db.Harvest
    .findAll({
      where: {
        date: {
          [Op.between]: [req.params.sdate, req.params.edate]
        }
      }
    })
    .then(function(dbHarvest) {
      res.json(dbHarvest);
    });
  });
};






