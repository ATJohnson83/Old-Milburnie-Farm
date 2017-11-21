var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(app) {

app.get('/api/harvests/:name?/:type?/createdAt?/:updatedAt?') function (req, res) {
    db.Harvest.findAll({
        where: {
            name : req.params.name,
            type : req.params.type,
            date: {
                [Op.between] : [req.params.createdAt, req.params.updatedAt]
            }
           }
        }
    }).then(function(dbHarvests){
        res.json(dbHarvests);
     });
    });






