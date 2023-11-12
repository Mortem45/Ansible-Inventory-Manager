const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  connection: {
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
  }
};