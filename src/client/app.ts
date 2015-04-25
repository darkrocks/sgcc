/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    angular.module('sgcc.app', [
        'ngRoute'
    ])
        .config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
            $httpProvider.defaults.useXDomain = true;
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }]);

}