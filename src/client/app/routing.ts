/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    export var routes = {
      issues: {
          templateUrl: '/app/issues/issues.html',
          controller: 'IssuesController'
      }
    };

    export var routingConfig = ($httpProvider, $routeProvider, $locationProvider) => {
        $httpProvider.defaults.useXDomain = true;
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.otherwise(routes.issues);
    };
    routingConfig.$inject = ['$httpProvider', '$routeProvider', '$locationProvider'];
}