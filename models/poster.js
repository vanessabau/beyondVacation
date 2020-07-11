//Sequelize table for database
module.exports = function(sequelize, DataTypes) {
    const Poster = sequelize.define("Poster", {
        property_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 120]
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {//less than 10,000 set price
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        size_of_party: {//number of people can stay at location
            type: DataTypes.INT,
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
    return Poster;
};