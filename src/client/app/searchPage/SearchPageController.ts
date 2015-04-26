/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export class SearchPageController {
        static $inject = ['$scope'];

        constructor(private $scope: any) {
            this.$scope.githubUser = '';
            this.$scope.selectedRepositoryName = '';
        }
    }
}