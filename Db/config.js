const path = require('path')
const dotenv=require('dotenv')
const p = path.resolve(__dirname,'./.env')
dotenv.config({
  path:p
  }) 

module.exports={
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PWD,
    port: process.env.POSTGRES_PORT
   }