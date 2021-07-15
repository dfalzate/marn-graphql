
require('dotenv').config();


module.exports = {
  MONGODB: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  SENDGRID: process.env.SENDGRID_KEY,
  SENDER: process.env.SENDER
}           

