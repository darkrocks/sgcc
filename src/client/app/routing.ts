/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    export var routes = {
      searchPage: {
          templateUrl: '/app/searchPage/searchPage.html',
          controller: 'sgccSearchPageController',
          reloadOnSearch: false
      },
        issueDetailsPage: {
            templateUrl: '/app/issueDetailsPage/issueDetailsPage.html',
            controller: 'sgccIssueDetailsPageController'
        }
    };

    export var routingConfig = ($httpProvider, $routeProvider, $locationProvider) => {
        $routeProvider.when('/issue/:githubUser/:repo/:number', routes.issueDetailsPage);
        $routeProvider.otherwise(routes.searchPage);
    };
    routingConfig.$inject = ['$httpProvider', '$routeProvider', '$locationProvider'];
}