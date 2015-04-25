/**
 * Created by user on 25.04.2015.
 */
module Sgcc.Issues {
    'use strict';

    export interface IRepositorySelectorDirectiveScope extends ng.IScope{
        repositoryOwner: string;
        selectedRepository: string;
        repositories: string[];
        onRepositoryOwnerChanged: () => void;
    }

    export class RepositorySelectorController {
        static $inject = ['$scope'];

        constructor(private $scope: IRepositorySelectorDirectiveScope) {
            this.initScope();
            this.$scope.$watch(() => this.$scope.repositoryOwner, () => {
                this.initScope();
            });
            this.$scope.onRepositoryOwnerChanged = () => {
                var i = 1;
            };
        }

        initScope() {
            if (!!this.$scope.repositoryOwner) {
                this.$scope.repositories = ['one', 'two', 'three'];
            } else {
                this.$scope.repositories = ['- Select a Repository -'];
            }
            this.$scope.selectedRepository = this.$scope.repositories[0];
        }
    }

    export function repositorySelectorDirective() {
        return {
            restrict: 'AEC',
            scope: {
                repositoryOwner: '=',
                selectedRepository: '='
            },
            templateUrl: '/app/issues/repositorySelector/repositorySelectorDirective.html',
            require: ['sgccRepositorySelector'],
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs, ctrlArr) => {

            },
            controller: 'sgccRepositorySelectorController'
        };
    }
    repositorySelectorDirective.$inject = [];
}