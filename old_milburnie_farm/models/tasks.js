module.exports = function(sequelize, DataTypes) {
  var Task= sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    openDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    closeDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Task.associate = function(models){
    Task.belongsTo(models.Users,{
      foreignKey: {
        allowNull: false
      },
      onDelete: "CASCADE"
    });
  };
  return Task;
};
