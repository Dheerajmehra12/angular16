const express = require('express');
const app = express();
var compression = require('compression');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
app.use(compression());
const appConstants = require('./src/server/app-constants');
// const logger = require(appConstants.MODULE_DIR + '/logger-module');
const envConfig = require('dotenv').config({path: appConstants.ENVIRONMENT_DIR + '/' + (process.env.ENV || '') + '.env'}).parsed;

require(appConstants.MODULE_DIR + '/route-module')(express,app);

// logger.debug('Environment [%s] : envConfig = [%s]',process.env.ENV||'Non Production',JSON.stringify(envConfig));

//default port
let listenPort = 8888;

//overriding port from value in ${ENV}.env file
if(envConfig && envConfig.LISTEN_PORT) {
    listenPort=envConfig.LISTEN_PORT;
}

const uri = 'mongodb+srv://dheerajmehra991744:tQYgWuwpG6fzPmpz@cluster0.ohoeo96.mongodb.net/' ||envConfig.MONGODB_URL;
const connectDB = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  connectDB();
//overriding port value from command args
if (process.argv.length >= 3) {
    listenPort = process.argv[2];
}

app.listen(listenPort, () => console.info(`server is listening on ${listenPort}`));
