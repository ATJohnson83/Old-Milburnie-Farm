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
      },
    username: {
        type: DataTypes.STRING,
      }

  });
  return Clock;
};