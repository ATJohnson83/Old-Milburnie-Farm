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
     active : {
      type: DataTypes.BOOLEAN,
      defaultValue : 1
    }
  });
  return Clock;
};