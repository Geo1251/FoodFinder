import ProductService from './productService.js';

class ProductController {
    async create(req, res) {
        try {
            const product = await ProductService.create(req.body);
            res.status(200).json(product);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const products = await ProductService.getAll();
            res.status(200).json(products);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async getOne(req, res) {
        try {
            const product = await ProductService.getOne(req.params.id);
            res.status(200).json(product);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async update(req, res) {
        try {
            const updatedProduct = await ProductService.update(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async delete(req, res) {
        try {
            const product = await ProductService.delete(req.params.id);
            res.status(200).json(product);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }
}

export default new ProductController();