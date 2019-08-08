module.exports = function(sequelize, DataTypes) {
    var Plant = sequelize.define('plants', {
      text: DataTypes.STRING,
      description: DataTypes.TEXT
    });
    return Plant;
  };
  