/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    angular.module('sgcc.data', [])
        .constant('sgccGithubApiUrl', 'https://api.github.com')
        .service('sgccGithubDataService', GithubDataService);
}