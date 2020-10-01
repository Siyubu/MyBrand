const dotenv = require('dotenv');

dotenv.config();
if(process.env.NODE_ENV === 'production')
{
    AppConfig = {
    
        dbString:  process.env.PROD_DB_STRING,
        port: process.env.PORT,
        secret: process.env.SECRET,
        salt: process.env.SALT_WORK_FACTOR
    }
    if(process.env.NODE_ENV === 'testdb')
    {
        AppConfig = {
    
            dbString:process.env.DEV_DB_TEST ,
            port: process.env.PORT,
            secret: process.env.SECRET,
            salt: process.env.SALT_WORK_FACTOR
        }

    }
    else{
        AppConfig = {
    
            dbString:process.env.DEV_DB_STRING ,
            port: process.env.PORT,
            secret: process.env.SECRET,
            salt: process.env.SALT_WORK_FACTOR
        }

    }

}


export default AppConfig;