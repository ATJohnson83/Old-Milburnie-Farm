module.exports = function(sequelize, DataTypes) {
  var Task= sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    employee: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    OpenDate: {
      type: DataTypes.DATEONLY,
      defaultValue: Date
    },
    CloseDate: {
      type: DataTypes.DATEONLY,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    active : {
      type: DataTypes.BOOLEAN,
      defaultValue : 1
    }
  });
  return Task;
};
