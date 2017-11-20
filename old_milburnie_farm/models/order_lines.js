module.exports = function(sequelize, DataTypes) {
  var Order_Lines= sequelize.define("Order_Lines", {
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
  Order_Lines.associate = function(models){
    Order_Lines.belongsTo(models.Orders, {
      foreignKey: {
        allowNull:false
      }
    });
  };
  return Order_Lines;
};