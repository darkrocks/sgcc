/**
 * Created by user on 25.04.2015.
 */
module Sgcc.Issues {
    'use strict';

    export class IssuesController {
        static $inject = ['$scope'];

        constructor(private $scope: any) {
            this.$scope.repositoryOwner = 'test';
            this.$scope.selectedRepository = '';
        }
    }
}