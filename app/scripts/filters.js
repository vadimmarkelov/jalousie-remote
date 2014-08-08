'use strict';

/**
 * @doc function
 * @name stringFilters.filter:capitalize
 * @description
 * Filter to transform the first character of a string to uppercase
 * */
angular.module('jalousieRemoteApp')
.filter('capitalize', function () {
    return function (input) {
        if (input !== null) {
          input = input.toLowerCase();
        }
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
});

/**
 * @doc function
 * @name formFilters.filter:htmlCleaner
 * @description
 * Filter to transform a number to the correct format
 * */
angular.module('jalousieRemoteApp')
.filter('htmlCleaner', ['$sanitize', function ($sanitize) {
    return function (data, disableEntities) {
        var converted = '';

        if (typeof disableEntities !== 'boolean') {
            disableEntities = false;
        }

        if (typeof data === 'object') {
            converted = {};

            angular.forEach(data, function (value, key) {
                if (typeof value === 'string') { // Only sanitize when the value is a string
                    converted[key] = $sanitize(value, disableEntities);
                }
                else {
                    converted[key] = value;
                }
            });
        }
        else {
            if (typeof data === 'string') {
                converted = $sanitize(data, disableEntities);
            }
        }
        return converted;
    };
}]);