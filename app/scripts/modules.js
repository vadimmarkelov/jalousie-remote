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