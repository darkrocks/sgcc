/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export interface IRepositorySelectorDirectiveScope extends ng.IScope{
        githubUser: string;
        selectedRepositoryName: string;
        selectedRepository: Data.Repository;
        repositories: Data.Repository [];
        errorMessage: string;
    }

    export class RepositorySelectorController {
        static $inject = ['$scope', '$q', 'sgccGithubDataService'];
        private selectRepositoryOption: Data.Repository = new Data.Repository(-1, '- Select a Repository -');
        private repositoriesLoadCanceller: ng.IDeferred<any> = this.$q.defer();

        constructor(private $scope: IRepositorySelectorDirectiveScope,
                    private $q: ng.IQService,
                    private githubDataService: Data.GithubDataService) {

            if (!this.$scope.selectedRepositoryName) {
                this.$scope.selectedRepositoryName = this.selectRepositoryOption.name;
            }
            this.updateScope();
            this.$scope.$watch(() => this.$scope.githubUser, () => {
                this.setRepositoriesDebounced();
            });
            this.$scope.$watch(() => this.$scope.selectedRepository, () => {
                if (!!this.$scope.selectedRepository) {
                    this.$scope.selectedRepositoryName = this.$scope.selectedRepository.name;
                } else {
                    this.$scope.selectedRepositoryName = null;
                }
            });
        }

        setRepositoriesDebounced = _.debounce(() => {
            this.$scope.selectedRepositoryName = this.selectRepositoryOption.name;
            this.updateScope();
            this.$scope.$digest();
        }, 1000);

        updateScope() {
            if (!!this.$scope.githubUser) {
                // cancel previous not finished request
                if (!!this.repositoriesLoadCanceller) {
                    this.repositoriesLoadCanceller.resolve();
                }
                this.repositoriesLoadCanceller = this.$q.defer();

                this.githubDataService.getRepositiries(
                    this.$scope.githubUser,
                    this.repositoriesLoadCanceller.promise)
                    .then((response: Data.IGetRepositiriesResponse) => {
                        this.$scope.repositories = response.repositories;
                        this.$scope.repositories.splice(0, 0, this.selectRepositoryOption);

                        this.$scope.selectedRepository = _.find(this.$scope.repositories, (repo: Data.Repository) => {
                            return repo.name = this.$scope.selectedRepositoryName;
                        });
                        this.$scope.errorMessage = null;
                    })
                    .catch((data: Data.IGetRepositiriesResponse) => {
                        this.$scope.repositories = [];
                        this.$scope.selectedRepository = null;
                        this.$scope.errorMessage = data.errorMessage;
                    });
            } else {
                this.$scope.repositories = [];
                this.$scope.selectedRepository = null;
                this.$scope.errorMessage = null;
            }
        }
    }

    export function repositorySelectorDirective($timeout: ng.ITimeoutService, $q: ng.IQService) {
        return {
            restrict: 'AEC',
            scope: {
                githubUser: '=',
                selectedRepositoryId: '='
            },
            templateUrl: '/app/searchPage/repositorySelector/repositorySelectorDirective.html',
            require: ['sgccRepositorySelector'],
            link: (scope: IRepositorySelectorDirectiveScope, element: ng.IAugmentedJQuery, attrs, ctrlArr) => {
            },
            controller: 'sgccRepositorySelectorController'
        };
    }
    repositorySelectorDirective.$inject = ['$timeout', '$q'];
}