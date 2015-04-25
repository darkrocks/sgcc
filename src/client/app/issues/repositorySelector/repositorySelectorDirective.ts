/**
 * Created by user on 25.04.2015.
 */
module Sgcc.Issues {
    'use strict';

    export interface IRepositorySelectorDirectiveScope extends ng.IScope{
        repositoryOwner: string;
        selectedRepository: Data.Repository;
        repositories: Data.Repository [];
    }

    export class RepositorySelectorController {
        static $inject = ['$scope', '$q', 'sgccGithubDataService'];

        private noSelectedRepository: Data.Repository = new Data.Repository(0, '- Select a Repository -');

        constructor(private $scope: IRepositorySelectorDirectiveScope,
                    private $q: ng.IQService,
                    private githubDataService: Data.GithubDataService) {
            this.setRepositories();
            this.$scope.$watch(() => this.$scope.repositoryOwner, () => {
                this.setRepositoriesDebounced();
            });
        }

        setRepositoriesDebounced = _.debounce(() => {
            this.setRepositories();
            this.$scope.$digest();
        }, 1000);

        setRepositories() {
            if (!!this.$scope.repositoryOwner) {
                this.githubDataService.getRepositiries(this.$scope.repositoryOwner)
                    .then((repositories: Data.Repository[]) => {
                        this.$scope.repositories = repositories;
                        this.$scope.selectedRepository = this.$scope.repositories[0];
                    });
            } else {
                this.$scope.repositories = [this.noSelectedRepository];
                this.$scope.selectedRepository = this.noSelectedRepository;
            }
        }
    }

    export function repositorySelectorDirective($timeout: ng.ITimeoutService, $q: ng.IQService) {
        return {
            restrict: 'AEC',
            scope: {
                repositoryOwner: '=',
                selectedRepository: '='
            },
            templateUrl: '/app/issues/repositorySelector/repositorySelectorDirective.html',
            require: ['sgccRepositorySelector'],
            link: (scope: IRepositorySelectorDirectiveScope, element: ng.IAugmentedJQuery, attrs, ctrlArr) => {
            },
            controller: 'sgccRepositorySelectorController'
        };
    }
    repositorySelectorDirective.$inject = ['$timeout', '$q'];
}