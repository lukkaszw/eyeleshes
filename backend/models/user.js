const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Client = require('./client');
const Visit = require('./visit');

const userSchema = mongoose.Schema({
  login: {
    type: String,
    validate: {
      validator: (value) => !/[\s]+/.test(value),
      message: props => 'Login powinien być jednym słowem (od 3 do 12 znaków)!',
    },
    required: true,
    minlength: 3,
    maxlength: 12,
    unique: [true, 'Podany login jest w użyciu!'],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
}, {
  timestamps: true,
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY );

  user.tokens.push({token});
  await user.save();
  
  return token;
}

userSchema.statics.sendRegistrationErrors = (error, res) => {


  if(error.code && error.code === 11000) {
    res.status(400).json({ 
      error: 'Podany login jest w użyciu! Proszę wybrać inny!' 
    });
    return;
  }

  if(error.errors) {
    if(error.errors.login) {
      res.status(400).json({ 
        error: 'Nieprawidłowy login! Login powinien być jednym słowem i mieć od 3 do 12 znaków!', 
      });
      return;
    }
  
  
    if(error.errors.password) {
      res.status(400).json({ 
        error: 'Nieprawidłowe hasło! Hasło powinno składać się z przynajmniej 8 znaków!', 
      });
      return;
    }
  }

  res.status(500).json(error);  
}

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login: { $eq: login }  });
  const errorMessage = 'Nieprawidłowy login lub hasło!';
  if(!user) {
    throw new Error(errorMessage);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw new Error(errorMessage);
  }

  return user;
}

userSchema.pre('save', async function (next) {
  const user = this;

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;

  await Client.deleteMany({ userId: user._id });
  await Visit.deleteMany({ userId: user._id });

  next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;