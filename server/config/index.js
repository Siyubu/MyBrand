// const dotenv = require('dotenv');

// dotenv.config();

exports.AppConfig = {
    dbString: process.env.NODE_ENV === 'production' ? process.env.PROD_DB_STRING : process.env.DEV_DB_STRING ,
    port: process.env.PORT,
    secret: process.env.SECRET,
    salt: process.env.SALT_WORK_FACTOR
}