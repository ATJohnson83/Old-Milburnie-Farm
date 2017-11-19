module.exports = function(sequelize, DataTypes) {
  var Clock = sequelize.define("Clock", {
    clockIn: {
      type: DataTypes.STRING,
      },
    clockOut: {
      type: DataTypes.STRING,
      },
      minutes: {
      type: DataTypes.INTEGER,
      },
     seconds : {
      type: DataTypes.INTEGER,
      defaultValue : 1
    }
  });
  return Clock;
};