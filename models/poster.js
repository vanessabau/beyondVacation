//Sequelize table for database and export
module.exports = function(sequelize, DataTypes) {
  const Poster = sequelize.define("Poster", {
    property_name: {
      //name of property, e.g. oasis in the hills
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 120]
      }
    },
    location: {
      //rental type, e.g. backyard, campsite
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      //address of listing
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      //city of listing
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      //state of listing
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      //zip code of listing
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      //less than 10,000 set price
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    size_of_party: {
      //number of people that can stay at location
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    facility: {
      //whether bathroom and shower are included
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    reserved: {
      //True or false to change when a listing is reserved
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reservedBy: {
      //User id from User model of user who reserved the listing
      type: DataTypes.INTEGER,
      allowNull: true
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
