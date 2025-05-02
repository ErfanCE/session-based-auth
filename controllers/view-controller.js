const { join } = require('node:path');

const renderLoginPage = (req, res, next) => {
  res.status(200).render(join(__dirname, '../views/login-page.ejs'));
};

const renderTestPage = (req, res, next) => {
  res.status(200).render(join(__dirname, '../views/send-image-test.ejs'));
};

module.exports = { renderLoginPage, renderTestPage };
