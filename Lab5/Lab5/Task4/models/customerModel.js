const {Sequelize} = require('sequelize');
const sequelize = require('../database.js');

const Customer = sequelize.define("Customers", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Age: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CustomerAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CustomerStatus: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

 module.exports = Customer