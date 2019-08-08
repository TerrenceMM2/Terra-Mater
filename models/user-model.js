module.exports = function(sequelize, DataTypes) {
   
  var Users = sequelize.define("Users", {
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true,
              notEmpty: true
          }
      },
      userName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [4, 20]
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [8, 20]
          }
      },
      firstName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false
      },

  });

  return Users;
};