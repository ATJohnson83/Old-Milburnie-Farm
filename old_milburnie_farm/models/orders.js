module.exports = function(sequelize, DataTypes) {
  var Orders= sequelize.define("Orders", {
    // customer: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    open_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      len: [1]
    },
    close_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  Orders.associate = function(models){
    Orders.belongsTo(models.Users, {
      foreignKey: {
        allowNull:false
      }
    });
  };
  return Orders;
};