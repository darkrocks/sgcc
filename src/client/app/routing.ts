/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    export var routes = {
      searchPage: {
          templateUrl: '/app/searchPage/searchPage.html',
          controller: 'sgccSearchPageController'
      }
    };

    export var routingConfig = ($httpProvider, $routeProvider, $locationProvider) => {
        $httpProvider.defaults.useXDomain = true;
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.otherwise(routes.searchPage);
    };
    routingConfig.$inject = ['$httpProvider', '$routeProvider', '$locationProvider'];
}