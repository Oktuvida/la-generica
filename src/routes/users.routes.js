const { Router } = require('express');
const router = Router();
const user_ctrl = require('../controllers/users.controller');
const { verify_token, is_admin, check_existing_roles } = require('../middlewares');

//router.get('/', [verify_token, is_admin], user_ctrl.find_users);
router.get('/', user_ctrl.find_users);

router.post('/', [verify_token, is_admin, check_existing_roles], user_ctrl.create_user);

router.get('/:id', [verify_token, is_admin], user_ctrl.find_user_by_id);

router.delete('/:id', [verify_token, is_admin], user_ctrl.find_user_and_remove);

module.exports = router;