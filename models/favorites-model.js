module.exports = function(sequelize, DataTypes) {
    var Favorites = sequelize.define('Favorites', {
        plantId: {
            type: DataTypes.INTEGER,
        },
        commonName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Favorites.associate = function(models) {
    // We're saying that a favorite should belong to a User
    // A Post can't be created without a User due to the foreign key constraint
        Favorites.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Favorites;
};