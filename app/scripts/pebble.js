'use strict';

/**
 * @ngdoc overview
 * @name jalousieRemoteApp
 * @description
 * # jalousieRemoteApp
 *
 * Main module of the application.
 */
angular.module('jalousieRemoteApp', [
    'ngCookies',
    'ngRoute',
    'jm.i18next',
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MainPebbleCtrl',
        resolve: {
          userData: ['authenticate', function (authenticate){
            return authenticate.getUserData('/pebble');
          }]
        },
        templateUrl: 'views/main.pebble.html'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', '$location', function ($rootScope, $location) {

  }])
;

// Translation module
angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider)
{
    'use strict';

    $i18nextProvider.options = {
        //debug: true,
        lng: 'en',
        fallbackLng: false,
        useCookie: false,
        useLocalStorage: false,
        resGetPath: '../locales/__lng__/__ns__.json',
        ns: {
            namespaces: ['messages'],
            defaultNs: 'messages'
        },
        getAsync: false
    };
}]);



// (function() {
//   loadOptions();
//   submitHandler();
// })();

// function submitHandler() {
//   var $submitButton = $('#submitButton');

//   $submitButton.on('click', function() {
//     console.log('Submit');

//     var return_to = getQueryParam('return_to', 'pebblejs://close#');
//     document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
//   });
// }

// function loadOptions() {
//   // var $backgroundColorPicker = $('#backgroundColorPicker');
//   // var $timeFormatCheckbox = $('#timeFormatCheckbox');

//   // if (localStorage.backgroundColor) {
//   //   $backgroundColorPicker[0].value = localStorage.backgroundColor;
//   //   $timeFormatCheckbox[0].checked = localStorage.twentyFourHourFormat === 'true';
//   // }
// }

// function getAndStoreConfigData() {
//   // var $backgroundColorPicker = $('#backgroundColorPicker');
//   // var $timeFormatCheckbox = $('#timeFormatCheckbox');

//   // var options = {
//   //   backgroundColor: $backgroundColorPicker.val(),
//   //   twentyFourHourFormat: $timeFormatCheckbox[0].checked
//   // };

//   // localStorage.backgroundColor = options.backgroundColor;
//   // localStorage.twentyFourHourFormat = options.twentyFourHourFormat;

//   // console.log('Got options: ' + JSON.stringify(options));
//   // return options;
// }

// function getQueryParam(variable, defaultValue) {
//   var query = location.search.substring(1);
//   var vars = query.split('&');
//   for (var i = 0; i < vars.length; i++) {
//     var pair = vars[i].split('=');
//     if (pair[0] === variable) {
//       return decodeURIComponent(pair[1]);
//     }
//   }
//   return defaultValue || false;
// }
