import UserProduct from './userProduct.js';
import Product from './product.js';

class UserProductService {
    async addProduct(userId, productId, quantity, mealType) {
        const userProduct = await UserProduct.create({
            userId,
            productId,
            quantity,
            mealType
        });

        return userProduct;
    }

    async getUserProducts(userId) {
        try {
            const userProducts = await UserProduct.findAll({ 
                where: { userId },
                include: [Product]
            });
            return userProducts;
        } catch (e) {
            console.error('Error fetching user products:', e);
            throw new Error('Failed to fetch user products');
        }
    }
}

export default new UserProductService();