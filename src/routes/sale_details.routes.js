const { Router } = require('express');
const router = Router();

const sale_details_ctrl = require('../controllers/sale_details.controller');
const { verify_token, is_admin } = require('../middlewares');

router.get('/', sale_details_ctrl.find_sale_details);

router.get('/:id', sale_details_ctrl.find_sale_detail_by_id);

router.post('/', [verify_token, is_admin], sale_details_ctrl.create_sale_detail);

router.put('/:id', [verify_token, is_admin], sale_details_ctrl.find_sale_detail_and_update);

router.delete('/:id', [verify_token, is_admin], sale_details_ctrl.find_sale_detail_and_remove);

module.exports = router;
