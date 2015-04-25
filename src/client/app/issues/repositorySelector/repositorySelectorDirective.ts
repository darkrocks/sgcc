/**
 * Created by user on 25.04.2015.
 */
module Sgcc.Issues {
    'use strict';

    export interface IRepositorySelectorDirectiveScope extends ng.IScope{
        repositoryOwner: string;
        selectedRepository: string;
        repositories: string[];
    }

    export class RepositorySelectorController {

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