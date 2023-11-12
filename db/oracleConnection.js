const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  connection : {
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    connectString : `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  }
};
