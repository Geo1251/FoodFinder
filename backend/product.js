import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proteins: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fats: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    carbohydrates: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    calories: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export default Product;