/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export var selectRepositoryOption: Data.Repository = new Data.Repository(-1, '- Select a Repository -');

    export class SearchPageController {
        static $inject = ['$scope'];

        constructor(private $scope: any) {
            this.$scope.githubUser = '';
            this.$scope.selectedRepositoryName = '';
        }
    }
}