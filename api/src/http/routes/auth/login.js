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

      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }

      console.log('Login Information:', loginInformations.data);
      console.log('User found:', user);

      if (!user.password) {  
        return res.status(500).send({ message: 'Password hash not found' });
      }

      const passwordIsValid = bcrypt.compareSync(
        loginInformations.data.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin, 
        },
        env.JWT_SECRET,
        {
          expiresIn: '24h',
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
