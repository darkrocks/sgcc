/**
 * Created by user on 25.04.2015.
 */
module Sgcc.Issues {
    'use strict';

    angular.module('sgcc.issues', ['sgcc.data'])
        .controller('sgccRepositorySelectorController', RepositorySelectorController)
        .directive('sgccRepositorySelector', repositorySelectorDirective)
        .controller('sgccIssuesController', IssuesController);
}