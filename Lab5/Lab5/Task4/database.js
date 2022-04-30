const Sequelize = require('sequelize');
const sequelize = new Sequelize("computersDB", "root", "28092001Nikita", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
  });

module.exports = sequelize;