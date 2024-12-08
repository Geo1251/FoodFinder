import { DataTypes } from 'sequelize';
import sequelize from './database.js';
import User from './user.js';
import Product from './product.js';

const UserProduct = sequelize.define('UserProduct', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    mealType: {
        type: DataTypes.ENUM('Завтрак', 'Обед', 'Ужин'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

UserProduct.belongsTo(User, { foreignKey: 'userId' });
UserProduct.belongsTo(Product, { foreignKey: 'productId' });

export default UserProduct;