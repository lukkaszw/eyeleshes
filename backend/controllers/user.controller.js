const User = require('../models/user');

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

module.exports = {
  signUp,
  signIn,
  getUserData,
};