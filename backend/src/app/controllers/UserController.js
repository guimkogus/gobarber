/* eslint-disable class-methods-use-this */
import User from '../models/Users';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: { name: req.body.name, email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword, password } = req.body;

    // find by Primary Key
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    if (password.length < 6) {
      return res.status(401).json({ error: 'Invalid password length.' });
    }

    // user.update é um método da classe pai da nossa model User chamada "Model" do Sequelize
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
