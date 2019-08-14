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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Users.associate = function(models) {
    // Associating Users with Favorites
    // When a User is deleted, also delete any associated Favorites
    Users.hasMany(models.Favorites, {
      onDelete: "cascade"
    });
  };
  return Users;
};
