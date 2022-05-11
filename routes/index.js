const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const validateProduct = require('../middlewares/validateProduct');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/products', productsController.getProductsAll);
router.get('/products/:id', productsController.getProductById);
router.get('/sales', salesController.getSalesAll);
router.get('/sales/:id', salesController.getSaleById);

router.post('/products', validateProduct, productsController.createProduct);
router.post('/sales', validateSale, salesController.createSale);

router.put('/products/:id', validateProduct, productsController.updateProduct);
router.put('/sales/:id', validateSale, salesController.updateSale);

router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;