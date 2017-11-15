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
      type: DataTypes.DATE,
      defaultValue: Date
    },
    CloseDate: {
      type: DataTypes.DATE,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    Active : {
      type: DataTypes.BOOLEAN,
      defaultValue : 1
    }
  });
  return Task;
};
