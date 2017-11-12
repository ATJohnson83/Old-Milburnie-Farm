module.exports = function(sequelize, DataTypes) {
  var Users= sequelize.define("Users", {
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
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: True
    }
  });
  return Users;
};