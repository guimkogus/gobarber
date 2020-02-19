import { Router } from 'express';
import User from './app/models/Users';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Guilherme M. KOGUS',
    email: 'guilherme.mkogus@gmail.com',
    password_hash: '12345678',
  });

  return res.json(user);
});

module.exports = routes;
