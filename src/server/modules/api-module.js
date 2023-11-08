module.exports=function (express, app) {
    const path = require('path');
    const fs = require('fs');
    const appConstants = require('../app-constants');
    const pug = require('pug');
    // const logger = require(appConstants.MODULE_DIR+ '/logger-module');
    // const siteConfig = require(appConstants.MODULE_DIR + '/site-config-module');
    // const utility = require(appConstants.MODULE_DIR + '/utility-module')();
    const services = require(appConstants.MODULE_DIR + '/services-module')(express, app);
    const needle = require('needle');
    require('dotenv').config({path: appConstants.ENVIRONMENT_DIR + '/' + (process.env.ENV || '') + '.env'}).parsed;

    function createThemedIndexFileIfNotExists(theme) {
      if (theme && theme.themeName !== 'default') {
        // const styleName = `${theme.themeName}-`;
        // const indexFileName = `/index-${theme.themeName.toLowerCase()}.html`;
        const styleName = '';
        const indexFileName = `/index.html`
        const linkHref0 = `css/${styleName}theme${(process.env.ENV && process.env.ENV === 'production') ? '.min' : ''}.css`;
        let linkHref1 = `css/styles/${styleName}style${(process.env.ENV && process.env.ENV === 'production') ? '.min' : ''}.css`;
        let indexFilePath = path.join(appConstants.APP_DIR, '/dist', indexFileName);
        if (!fs.existsSync(indexFilePath)) {
          try {
            const cheerio = require('cheerio');
            const indexHtmlContent = fs.readFileSync(path.join(appConstants.APP_DIR, '/dist', '/index.html')).toString();
            const $ = cheerio.load(indexHtmlContent);
            $('#client-theme-file-0').attr('href', linkHref0);
            $('#client-theme-file-1').attr('href', linkHref1);
            const newIndexHtmlContent = $.html();
            console.info('New Index HTML Content ' + newIndexHtmlContent);
            fs.writeFileSync(indexFilePath, newIndexHtmlContent);
          } catch (e) {
            console.error('Error generating index file according to theme: ' + e.message);
          }
        }
      }
    }

    function getIndexFilePathForTheme(theme) {
        theme = {themeName:''}; //deafult now 
      let indexFileName = '/index.html';
      if (theme && theme.themeName !== 'default') {
        indexFileName = `/index-${theme.themeName.toLowerCase()}.html`;
      }
      let indexFilePath = path.join(appConstants.APP_DIR,'/dist',indexFileName);
      if(!fs.existsSync(indexFilePath)) {
        indexFileName = '/index.html';
        indexFilePath = path.join(appConstants.APP_DIR,'/dist',indexFileName);
      }
      return indexFilePath;
    }

    function getAngularScriptsFromIndexPage() {
      let angularScipts = '';
      try{
        const cheerio = require('cheerio');
        const indexHtmlContent = fs.readFileSync(path.join(appConstants.APP_DIR, '/dist', '/index.html')).toString();
        const $ = cheerio.load(indexHtmlContent);
        angularScipts = $.html($('body script[type="module"], body script[defer], body script[nomodule]'));
        console.info(`angularScipts in body = ${angularScipts}`);
      }catch (e) {
        console.error(e);
        console.error(`Error dynamic embedding of angularScipts`);
        angularScipts = '';
      }
      return angularScipts;
    }

    function getTheme(request, skipFileCreation = true) { // skipFileCreation = false --edit
      console.info("host: %s, request url: %s", request.headers.host, request.url);
    //   let theme = siteConfig().theme(request.headers.host);
      // if(!skipFileCreation) {
      //   createThemedIndexFileIfNotExists(theme);
      // }
      return {themeName:'default'};
    }

    return {
        loginApi:services.loginApi,
        themeHandler: function (request, response) {
            response.json(getTheme(request));
        },
        htmlPartialsHandler: function(httpReq, httpRes) {
            let theme = getTheme(httpReq);
            console.info(`Requested partials: ${httpReq.url}`);
            let partialPath=httpReq.url.toString().split('/html')[1];
            if(partialPath.endsWith('.html')) {
                partialPath=partialPath.replace('.html','.pug');
            }
            console.info(`partialPath: ${partialPath}`);
            try{
                let html = pug.renderFile(path.join(appConstants.APP_DIR, '/src/partials', partialPath),{
                    pretty: true,
                    model: httpReq.body,
                    theme: theme
                });
                httpRes.type('html').send(html);
            }catch(ex){
                httpRes.status(404).send('Required file missing');
            }
        },
        requestHandler: function(request, response) {
          console.info('Request Handler Invoked');
          const theme = getTheme(request);
          const indexFilePath = getIndexFilePathForTheme(theme);
          console.info('Index file served '+indexFilePath);
          response.type('html').sendFile(indexFilePath);
        },
        jsonFileMissingErrorHandler: function(err, req, res, next){
            if(err.status === 404) {
                res.status(404).type('json').send({
                    status: 404,
                    ecode: 404,
                    edesc: (err.message) ? err.message: 'Not Found',
                    response: null
                });
            } else{
                next();
            }
        },
        errorHandler: function(err, req, res, next) {
            console.info('Error Handler Invoked');
            console.error(err.stack);
            let message = "Something is not right!";
            if(err != undefined) {

                if(err.status === 401) {

                    message = "You do not have access to this resource"

                } else if(err.status == 400) {
                    message = "SAMLResponse is undefined in ACS POST body"
                }
                else {

                    message = "..........."
                }
            }
            let html = pug.renderFile(path.join(appConstants.APP_DIR, '/src/partials', '/error.pug'),{
                title: 'Angular Learning - Wait Few minutes!!',
                theme: getTheme(req),
                // theme: {themeName:'default'},
                error: message,
                pretty: true
            });
            res.status(500).type('html').send(html);
        }
    };
};
