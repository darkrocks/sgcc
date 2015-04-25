/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    angular.module('sgcc.app', [
        'ngRoute',
        'sgcc.issues'
    ])
        .config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
            $httpProvider.defaults.useXDomain = true;
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            var mainRoute: ng.route.IRoute = {
                templateUrl: '/app/issues/issues.html',
                controller: 'IssuesController'
            };

            $routeProvider.otherwise(mainRoute);
        }]);

}