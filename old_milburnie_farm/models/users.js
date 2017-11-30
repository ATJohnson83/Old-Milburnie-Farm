var bcrypt = require("bcrypt-nodejs");

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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [1]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

   Users.associate = function(models) {
     // Associating Users with Clocks
     // When an Users is deleted, also delete any associated Clocks
     Users.hasMany(models.Clock, { onDelete: "cascade" });
   };

  Users.prototype.validPassword = function(password) {
    return (password == this.password);
  };
  
  return Users;
};