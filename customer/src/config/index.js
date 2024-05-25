const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {

  console.log(process.env.NODE_ENV );
  //const configFile = `./.env.${process.env.NODE_ENV}`;
 
  dotEnv.config({path: './.env.dev'});
  
} else {
  dotEnv.config();
 
}

module.exports = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: 'ONLINE_SHOPPING',
  CUSTOMER_BINDING_KEY: 'CUSTOMER_SERVICE',
  QUEUE_NAME: 'CUSTOMER_QUEUE'
};
