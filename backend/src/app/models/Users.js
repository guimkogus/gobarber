import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // Virtual é o tipo de dado que nunca vai existir dentro do Banco de dados, apenas no nosso código
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // Hooks do Sequelize
    // Before Save = chamará uma função antes do user ser salvo no banco de dados
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    // Retornará true caso as senhas sejam iguais
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
