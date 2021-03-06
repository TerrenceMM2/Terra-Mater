module.exports = function(sequelize, DataTypes) {
    var Plants = sequelize.define('Plants', {
        plantId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        commonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scienName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shortDesc: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        longDesc: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        poisHuman: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        poisAnimal: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        poisNotes: {
            type: DataTypes.TEXT,
        },
        genCare: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        food: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        water: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        minTemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.BLOB,
            allowNull: false,
            get() {
                return this.getDataValue('img').toString('utf8');
            },
        },
        sunlight: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {timestamps: false});
    return Plants;
};