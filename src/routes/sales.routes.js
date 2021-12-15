const { Router } = require('express');
const router = Router();

const sales_ctrl = require('../controllers/sales.controller');
const { verify_token, is_admin } = require('../middlewares');

router.get('/', sales_ctrl.find_sales);

router.get('/:id', sales_ctrl.find_sale_by_id);

router.post('/', verify_token, sales_ctrl.create_sale);

router.put('/:id', [verify_token, is_admin], sales_ctrl.find_sale_and_update);

router.delete('/:id', [verify_token, is_admin], sales_ctrl.find_sale_and_remove);

module.exports = router;
