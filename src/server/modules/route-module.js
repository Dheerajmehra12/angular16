module.exports=function (express, app) {
    const path = require('path');
    const appConstants = require('../app-constants');
    const api=require(appConstants.MODULE_DIR+'/api-module')(express, app);
    const bodyParser = require('body-parser');
    app.use(express.static(path.join(appConstants.APP_DIR,'/dist')));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
    app.use(bodyParser.json({limit: '50mb', extended: true }));
    app.get('/api/theme', api.themeHandler);
    app.post('/api/login',api.loginApi);
    app.all('/html/*',api.htmlPartialsHandler);
    app.use('*', api.requestHandler);
    app.use('/samples', api.jsonFileMissingErrorHandler);
    app.use(api.errorHandler);
};
