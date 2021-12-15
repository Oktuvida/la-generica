const { Router } = require('express');
const router = Router();

const products_ctrl = require('../controllers/products.controller');
const { verify_token } = require('../middlewares');

router.get('/', products_ctrl.find_products);

router.get('/:id', products_ctrl.find_product_by_id);

router.post('/', verify_token, products_ctrl.create_product);

router.put('/:id', verify_token, products_ctrl.find_product_and_update);

router.delete('/:id', verify_token, products_ctrl.find_product_and_remove);

module.exports = router;
