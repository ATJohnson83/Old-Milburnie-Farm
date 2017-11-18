module.exports = function(sequelize, DataTypes) {
  var Clock = sequelize.define("Clock", {
    clockIn: {
      type: DataTypes.STRING,
      },
    clockOut: {
      type: DataTypes.STRING,
      },
      totalTime: {
      type: DataTypes.STRING,
      },
     isActive : {
      type: DataTypes.BOOLEAN,
      defaultValue : 1
    }
  });
  return Clock;
};