const router = require('express').Router();
const { renderLoginPage } = require('../controllers/view-controller');

router.get('/login', renderLoginPage);

module.exports = router;
