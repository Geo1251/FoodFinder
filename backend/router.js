import { Router } from 'express';
import UserController from './userController.js';
import ProductController from './productController.js';
import UserProductController from './userProductController.js';

const router = new Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users', UserController.getAllUsers);
router.get('/verify-token', UserController.verifyToken);
router.put('/users/:id', UserController.updateUser); 
router.put('/users/:id/avatar', UserController.updateAvatar); 

router.post('/products', ProductController.create);
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getOne);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

router.post('/user-products/:userId', UserProductController.addProduct);
router.get('/user-products/:userId', UserProductController.getUserProducts);

export default router;