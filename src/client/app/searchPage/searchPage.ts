/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    angular.module('sgcc.searchPage', ['ngRoute', 'sgcc.data'])
        .controller('sgccRepositorySelectorController', RepositorySelectorController)
        .directive('sgccRepositorySelector', repositorySelectorDirective)
        .controller('sgccIssuesGridController', IssuesGridController)
        .directive('sgccIssuesGrid', issuesGridDirective)
        .controller('sgccSearchPageController', SearchPageController)
        .service('sgccUrlService', UrlService);
}