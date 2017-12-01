module.exports = function(sequelize, DataTypes) {
  var Orders= sequelize.define("Orders", {
    open_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      len: [1]
    },
    delivered_date: {
      type: DataTypes.DATEONLY,      
      allowNull: true,
      defaultValue: "0000-00-00"
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "Unpaid"
    },
    order_status: {
      type: DataTypes.STRING,
      defaultValue: "Open"
    }
  });

  Orders.associate = function(models){
    Orders.belongsTo(models.Users, {
      foreignKey: {
        allowNull:false
      }
    });

    Orders.hasMany(models.Order_Lines, {
      onDelete: "cascade"
    });
  };

  return Orders;
};