module.exports = function(sequelize, DataTypes) {
  var Clock = sequelize.define("Clock", {
    clockIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clockOut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });
  return Clock;
};