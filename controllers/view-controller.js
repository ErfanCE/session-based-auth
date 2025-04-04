const { join } = require('node:path');

const renderLoginPage = (req, res, next) => {
  res.status(200).render(join(__dirname, '../views/login-page.ejs'));
};

module.exports = { renderLoginPage };
