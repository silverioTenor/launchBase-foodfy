const User = require('../models/User');

class ProfileController {

  async profile(request, response) {
    try {
      const { id } = request.params;
      const { userID } = request.session.user;

      const userDB = new User();
      const user = await userDB.findOne({ where: { id } });

      if (user.id !== userID) return response.redirect(`/admin/profile/${userID}`);

      user.firstName = user.name.split(' ')[0];

      return response.render('private/users/profile', { user });
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });
    }
  }

  async put(request, response) {
    try {
      const user = request.user;
      const { id, name, email } = request.bodyValidated;

      const userDB = new User();
      await userDB.update({
        id,
        column: 'id',
      }, {
        name,
        email,
      });

      user.firstName = user.name.split(' ')[0];

      return response.render('private/users/profile', {
        user,
        toast: {
          status: 'success',
          message: 'Dados atualizados com sucesso!'
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });
    }
  }
};

module.exports = ProfileController;