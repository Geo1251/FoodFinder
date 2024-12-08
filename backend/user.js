import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    birthYear: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    goal: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    }
});

export default User;