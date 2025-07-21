const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', createProduct); // will be used via tools like Thunder Client

module.exports = router;
