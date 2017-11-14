module.exports = function(sequelize, DataTypes) {
  var Sales_Inventory= sequelize.define("Sales_Inventory", {
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
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue: 0
    },
    Unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }

  });
  return Sales_Inventory;
};