
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user){
  return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image
      }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
  Mutation: {
    async login(_, {email, password}){
      const {errors, valid} = validateLoginInput(email, password);

      if(!valid){
        throw new UserInputError('Errors', { errors});

      }

      const user = await User.findOne({email});
      
      if(!user){
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors});
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match){
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors});
      }

      const token = generateToken(user);
    
            return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword, image, googleId }
      },
    ) {
      
      const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword, image, googleId);
      if(!valid){
        throw new UserInputError('Errors', {errors});
      }
      
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('Ya existe un usuario con ese email.', {
          errors: {
            username: 'Ya existe un usuario con ese nombre'
          }
        })
      }
      
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        image,
        googleId
      });

      const res = await newUser.save();

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};