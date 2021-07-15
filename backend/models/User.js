const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  image: String,
  googleId:String
});

module.exports = model('User', userSchema);
