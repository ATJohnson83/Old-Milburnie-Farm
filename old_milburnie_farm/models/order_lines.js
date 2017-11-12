module.exports = function(sequelize, DataTypes) {
  var Order_Lines= sequelize.define("Order_Lines", {
    order_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    }
  });
  return Order_Lines;
};