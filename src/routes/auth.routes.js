const {Router} = require('express');
const router = Router();
const auth_ctrl = require('../controllers/auth.controller');

router.post('/signup', auth_ctrl.signup);
router.post('/signout', auth_ctrl.signout);
router.post('/signin', auth_ctrl.signin);

module.exports = router;