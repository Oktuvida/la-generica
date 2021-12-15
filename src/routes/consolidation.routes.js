const { Router } = require('express');
const router = Router();

const consolidation_ctrl = require('../controllers/consolidation.controller');
const { verify_token, is_admin } = require('../middlewares');

router.get('/', consolidation_ctrl.find_consolidations);

router.get('/:id', consolidation_ctrl.find_consolidation_by_id);

router.post('/', [verify_token, is_admin], consolidation_ctrl.create_consolidation);

router.put('/:id', [verify_token, is_admin], consolidation_ctrl.find_consolidation_and_update);

router.delete('/:id', [verify_token, is_admin], consolidation_ctrl.find_consolidation_and_remove);

module.exports = router;

