module.exports = function(sequelize, DataTypes) {
  var Clock = sequelize.define("Clock", {
    clockIn: {
      type: DataTypes.STRING,
      },
    clockOut: {
      type: DataTypes.STRING,
      },
      total: {
      type: DataTypes.STRING,
      }
  });

  Clock.associate = function(models) {
    Clock.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Clock;
};