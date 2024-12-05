const authenticate = require('../../../middlewares/auth');
const adminOnly = require('../../../middlewares/admin');

async function dashboard(app) {
  app.get('/dashboard', { preHandler: [authenticate, adminOnly] }, async (req, res) => {
    res.status(200).send({ message: 'Welcome to the admin dashboard!' });
  });
}

module.exports = dashboard;