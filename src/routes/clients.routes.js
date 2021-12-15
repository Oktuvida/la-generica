const { Router } = require('express');
const router = Router();

const client_ctrl = require('../controllers/clients.controller')
const {verify_token, is_admin} = require('../middlewares/index');

router.get('/', client_ctrl.find_clients);

router.get('/:id', client_ctrl.find_client_by_id);

router.post('/', [verify_token, is_admin], client_ctrl.create_client);

router.put('/:id', [verify_token, is_admin], client_ctrl.find_client_and_update);

router.delete('/:id', [verify_token, is_admin], client_ctrl.find_client_and_remove);

module.exports = router;