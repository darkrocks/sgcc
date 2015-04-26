/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export interface IRepositorySelectorDirectiveScope extends ng.IScope{
        githubUser: string;
        selectedRepositoryName: string;
        selectedRepository: Data.Repository;
        onSelectedRepositoryChange: () => void;
        selectedRepositoryChanged: (repository: Data.Repository) => void;
        onUserChange: () => void;
        userChanged: () => void;
        repositories: Data.Repository [];
        errorMessage: string;
    }

    export class RepositorySelectorController {
        static $inject = ['$scope', '$q', 'sgccGithubDataService'];
        private repositoriesLoadCanceller: ng.IDeferred<any> = this.$q.defer();
        private debounceConst: number = 1000;

        constructor(private $scope: IRepositorySelectorDirectiveScope,
                    private $q: ng.IQService,
                    private githubDataService: Data.GithubDataService) {
            this.updateScope();

            this.$scope.$watch(() => this.$scope.githubUser, (newVal, oldVal) => {
                if (newVal === oldVal) {
                    return;
                }
                this.updateScope();
            });

            this.$scope.$watch(() => this.$scope.selectedRepositoryName, (newVal, oldVal) => {
                if (newVal === oldVal) {
                    return;
                }
                this.$scope.selectedRepository = _.find(this.$scope.repositories, (repo: Data.Repository) => {
                    return (repo.name === this.$scope.selectedRepositoryName);
                });

                if (!this.$scope.selectedRepository) {
                    this.$scope.selectedRepository = selectRepositoryOption;
                }
            });

            this.$scope.selectedRepositoryChanged = (repository: Data.Repository) => {
                if (!!this.$scope.selectedRepository && !(this.$scope.selectedRepository === selectRepositoryOption)) {
                    this.$scope.selectedRepositoryName = this.$scope.selectedRepository.name;
                } else {
                    this.$scope.selectedRepositoryName = null;
                }
                this.$scope.onSelectedRepositoryChange();
            };

            this.$scope.userChanged = () => {
                this.$scope.repositories = null;
                this.$scope.selectedRepository = null;
                this.$scope.selectedRepositoryName = null;
                this.$scope.errorMessage = null;
                this.$scope.onUserChange();
            };
        }

        updateScope =  _.debounce(() => {
            // cancel previous request
            if (!!this.repositoriesLoadCanceller) {
                this.repositoriesLoadCanceller.resolve();
            }
            this.repositoriesLoadCanceller = this.$q.defer();

            if (!!this.$scope.githubUser) {
                this.githubDataService.getRepositiries(
                    this.$scope.githubUser,
                    this.repositoriesLoadCanceller.promise)
                    .then((response: Data.IGetRepositiriesResponse) => {
                        this.$scope.repositories = response.repositories;
                        this.$scope.repositories.splice(0, 0, selectRepositoryOption);

                        this.$scope.selectedRepository = _.find(this.$scope.repositories, (repo: Data.Repository) => {
                            return (repo.name === this.$scope.selectedRepositoryName);
                        });

                        if (!this.$scope.selectedRepository) {
                            this.$scope.selectedRepository = selectRepositoryOption;
                        }
                        this.$scope.errorMessage = null;
                    })
                    .catch((data: Data.IGetRepositiriesResponse) => {
                        this.$scope.repositories = null;
                        this.$scope.selectedRepository = null;
                        this.$scope.errorMessage = data.errorMessage;
                    });
            } else {
                this.$scope.repositories = null;
                this.$scope.selectedRepository = null;
                this.$scope.errorMessage = null;
            }
        }, this.debounceConst);
    }

    export function repositorySelectorDirective($timeout: ng.ITimeoutService, $q: ng.IQService) {
        return {
            restrict: 'AEC',
            scope: {
                githubUser: '=',
                selectedRepositoryName: '=',
                onUserChange: '&',
                onSelectedRepositoryChange: '&'
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