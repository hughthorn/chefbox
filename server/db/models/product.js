const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ingredients: {
        type: Sequelize.ARRAY(Sequelize.STRING), // eslint-disable-line new-cap
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    timeToPrep: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    availability: {
        type: Sequelize.ENUM('available', 'pending', 'out of stock'), // eslint-disable-line new-cap
        allowNull: false,
        defaultValue: 'pending'
    },
    numberInStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    }
})

module.exports = Product
