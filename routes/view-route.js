const router = require('express').Router();
const {
  renderLoginPage,
  renderTestPage
} = require('../controllers/view-controller');

router.get('/login', renderLoginPage);

router.get('/send-image-test', renderTestPage);

module.exports = router;
