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
    quantity: {
      type: DataTypes.DECIMAL(10,3),
      allowNull:true,
      defaultValue: 0
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }

  });
  return Sales_Inventory;
};