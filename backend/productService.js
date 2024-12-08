import Product from './product.js';

class ProductService {
    async create(productData) {
        try {
            const product = await Product.create(productData);
            return product;
        } catch (e) {
            console.error(e);
            throw new Error('Failed to create product');
        }
    }

    async getAll() {
        try {
            const products = await Product.findAll();
            return products;
        } catch (e) {
            console.error(e);
            throw new Error('Failed to fetch products');
        }
    }

    async getOne(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (e) {
            console.error(e);
            throw new Error('Failed to fetch product');
        }
    }

    async update(id, productData) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product not found');
            }
            await product.update(productData);
            return product;
        } catch (e) {
            console.error(e);
            throw new Error('Failed to update product');
        }
    }

    async delete(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product not found');
            }
            await product.destroy();
            return product;
        } catch (e) {
            console.error(e);
            throw new Error('Failed to delete product');
        }
    }
}

export default new ProductService();