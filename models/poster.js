//Sequelize table for database and export
module.exports = function(sequelize, DataTypes) {
    const Poster = sequelize.define("Poster", {
        property_name: {//name of property, e.g. oasis in the hills
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 120]
            }
        },
        location: {//category of rental, e.g. backyard, campsite
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {//less than 10,000 set price
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        size_of_party: {//number of people can stay at location
            type: DataTypes.INTEGER,
            validate: {
                len: [1]
            }
        },
        facility: {//whether bathroom and shower are included
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        reserved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    //Poster belongs to User
    Poster.associate = function(models) {
        //Poster can't be created without a User
        Poster.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Poster;
};