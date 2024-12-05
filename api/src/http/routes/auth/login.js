const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = require('../../../db/controllers/UserController');
const env = require('../../../utils/env');
const { loginSchema } = require('../../../utils/schemas/userSchemas');

async function login(app) {
  app.post('/auth/login', async (req, res) => {
    const loginInformations = loginSchema.safeParse(req.body);

    if (!loginInformations.success || !loginInformations.data) {
      return res.status(400).send({
        error: 'The login informations are incomplete or invalid',
      });
    }

    const userController = new UserController(
      loginInformations.data.email,
      loginInformations.data.password,
      res
    );

    try {
      const user = await userController.validateIfExists();

      if (!user || user.length === 0) {
        return res.status(400).send({ message: 'User not found' });
      }

      const passwordIsValid = bcrypt.compareSync(
        loginInformations.data.password,
        user[0].passwordHash 
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        {
          id: user[0]._id,
          email: user[0].email,
          isAdmin: user[0].email === 'admin@admin.com', 
        },
        env.JWT_SECRET,
        {
          expiresIn: '24h', // 24 horas
        }
      );


      res.setCookie('token', token, {
        httpOnly: true,
        maxAge: 86400, 
        path: '/',
        sameSite: 'Lax',
        secure: false, 
      });

      return res.status(200).send({
        message: 'Login successful',
      });
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }
  });
}

module.exports = login;