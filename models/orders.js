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
      },
      onDelete: "CASCADE"
    });

    Orders.hasMany(models.Order_Lines);
  };

  return Orders;
};