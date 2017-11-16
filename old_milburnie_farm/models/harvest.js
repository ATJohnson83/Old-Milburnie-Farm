module.exports = function(sequelize, DataTypes) {
  var Harvest = sequelize.define("Harvest", {
    date: {
      type: DataTypes.DATEONLY
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
   field: {
      type: DataTypes.TEXT
    },
    bed: {
      type: DataTypes.TEXT,
    },
    quantity: {
      type: DataTypes.TEXT,
    },
    units: {
      type: DataTypes.TEXT,
    },
    active : {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }

  });
  return Harvest;
};
