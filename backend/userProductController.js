import UserProductService from './userProductService.js';

class UserProductController {
    async addProduct(req, res) {
        try {
            const { productId, quantity, mealType } = req.body;
            const { userId } = req.params;
            const userProduct = await UserProductService.addProduct(userId, productId, quantity, mealType);
            res.status(200).json(userProduct);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getUserProducts(req, res) {
        try {
            const userProducts = await UserProductService.getUserProducts(req.params.userId);
            res.status(200).json(userProducts);
        } catch (e) {
            console.error('Error fetching user products:', e);
            res.status(500).json({ message: e.message });
        }
    }
}

export default new UserProductController();