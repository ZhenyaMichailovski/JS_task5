const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'D:\\учеба\\3 курс\\2 семестр\\РПИ\\lab5_2\\lab5db.db'
});

const Ebook = sequelize.define("Ebooks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    screenSize: {
        type: Sequelize.STRING,
        allowNull: false
    },
    screenResolution: {
        type: Sequelize.STRING,
        allowNull: false
    },
    screenType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    flashMemory: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Ebook