/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    angular.module('sgcc.app', [
        'ngRoute',
        'angular-loading-bar',
        'sgcc.searchPage',
        'sgcc.navbar'
    ])
        .config(routingConfig)
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }]);
}