const User = require('../models/user');
const ERRORS = require('../errors/errors');

const signUp = async (req, res) => {
  const { login, password, confirmPassword } = req.body;

  if(confirmPassword !== password) {
    res.status(400).json({
      error: 'Hasło i potwierdzenie hasła się różnią! Proszę poprawnie potwierdzić hasło!',
    });
    return;
  }

  try {

    const user = new User({ login, password });

    await user.save();

    const token = await user.generateAuthToken();

    res.json({ user, token });

  } catch (error) {
    User.sendRegistrationErrors(error, res);
  }
}

const signIn = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findByCredentials(login, password);

    const token = await user.generateAuthToken();
    
    res.json({ token, user });
  } catch (error) {
    if(error.message === 'Nieprawidłowy login lub hasło!') {
      res.status(400).json({
        error: error.message,
      });
      return;
    }

    res.status(500).json(error);
  }
}

const getUserData = (req, res) => {
  res.json(req.user);
}

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens
      .filter(token => token.token.toString() !== req.token);
    await req.user.save();
    res.json({
      message: 'Successfull logout!',
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteUser = async (req, res) => {

  const login = req.user.login;
  const { password } = req.body;

  try {
    const user = await User.findByCredentials(login, password);

    await user.remove();

    res.json(user);
  } catch (error) {

    if(error.message === 'Nieprawidłowy login lub hasło!') {
      res.status(400).json({
        error: ERRORS.FORMS.user.removePassword,
      });
      return;
    }

    res.status(500).json({
      error: ERRORS.BAD_SERVER,
    });
  }
}

const updateLogin = async (req, res) => {
  const login = req.user.login;
  const { login: newLogin, password } = req.body;

  try {
    const user = await User.findByCredentials(login, password);

    user.login = newLogin;

    await user.save();

    res.json(user);

  } catch (error) {
    if(error.message === 'Nieprawidłowy login lub hasło!') {
      res.status(400).json({
        error: ERRORS.FORMS.user.updateUser,
      });
      return;
    }

    res.status(500).json({
      error: ERRORS.BAD_SERVER,
    });
  }
}

const updatePassword = async (req, res) => {
  const login = req.user.login;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const password = oldPassword;

  try {
    const user = await User.findByCredentials(login, password);

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        error: 'Hasła nie pasują do siebie! Wprowadź poprawne hasła!',
      });
      return;
    }

    user.password = newPassword;

    await user.save();

    res.json(user);

  } catch (error) {
    if(error.message === 'Nieprawidłowy login lub hasło!') {
      res.status(400).json({
        error: ERRORS.FORMS.user.updateUser,
      });
      return;
    }

    console.log(error);

    res.status(500).json({
      error: ERRORS.BAD_SERVER,
    });
  }
}

module.exports = {
  signUp,
  signIn,
  getUserData,
  logout,
  deleteUser,
  updateLogin,
  updatePassword,
};