(function (window) {
  var AppConfig=function () {
    var env='{ENV}';
    var appConfig={
      local: {
        debugEnabled: true,
        environment: env,
        currencySymbol: '{CURRENCY_SYMBOL_DEFAULT}',
        currency: '{CURRENCY_DEFAULT}',
        homeCountry: '{HOME_COUNTRY}',
        appName: '{APP_NAME}',
        appDisplayName: '{APP_NAME_DISPLAY}',
      },
      staging: {
        debugEnabled: true,
        environment: env,
        currencySymbol: '{CURRENCY_SYMBOL_DEFAULT}',
        currency: '{CURRENCY_DEFAULT}',
        homeCountry: '{HOME_COUNTRY}',
        appName: '{APP_NAME}',
        appDisplayName: '{APP_NAME_DISPLAY}',
      },
      preprod: {
        debugEnabled: true,
        environment: env,
        currencySymbol: '{CURRENCY_SYMBOL_DEFAULT}',
        currency: '{CURRENCY_DEFAULT}',
        homeCountry: '{HOME_COUNTRY}',
        appName: '{APP_NAME}',
        appDisplayName: '{APP_NAME_DISPLAY}',
      },
      production: {
        debugEnabled: true,
        environment: env,
        currencySymbol: '{CURRENCY_SYMBOL_DEFAULT}',
        currency: '{CURRENCY_DEFAULT}',
        homeCountry: '{HOME_COUNTRY}',
        appName: '{APP_NAME}',
        appDisplayName: '{APP_NAME_DISPLAY}',
      }
    };
    if(appConfig[env]){
      return appConfig[env];
    }else{
      appConfig['staging'].appName='{APP_NAME}';
      appConfig['staging'].appDisplayName='{APP_NAME_DISPLAY}';
    }
    return appConfig.staging;
  };
  window.appConfig = new AppConfig();
  if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = window.appConfig;
  }
  return window.appConfig;
}(window));
