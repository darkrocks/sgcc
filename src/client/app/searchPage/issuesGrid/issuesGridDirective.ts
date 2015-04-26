/**
 * Created by user on 26.04.2015.
 */
/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export interface IIssuesGridDirectiveScope extends ng.IScope{
        githubUser: string;
        selectedRepositoryName: string;
        issues: Data.Issue[];
        pages: number[];
        currentPage: number;
        perPage: number
        onPageClicked: (pageNumber: number) => void;
        onPreviousClicked: () => void;
        onNextClicked: () => void;
}

    export class IssuesGridController {
        static $inject = ['$scope', '$q', 'sgccGithubDataService'];
        private issuesLoadCanceller: ng.IDeferred<any> = this.$q.defer();

        constructor(private $scope: IIssuesGridDirectiveScope,
                    private $q: ng.IQService,
                    private githubDataService: Data.GithubDataService) {
            this.$scope.perPage = 20;
            this.$scope.currentPage = 1;


            this.$scope.$watch(() => this.$scope.githubUser, () => {
                this.$scope.currentPage = 1;
                this.setIssues();
            });

            this.$scope.$watch(() => this.$scope.selectedRepositoryName, () => {
                this.$scope.currentPage = 1;
                this.setIssues();
            });

            this.$scope.$watch(() => this.$scope.currentPage, () => {
                this.setIssuesDebounced();
            });

            this.$scope.$watch(() => this.$scope.perPage, () => {
                this.$scope.currentPage = 1;
                this.setIssuesDebounced();
            });

            this.$scope.onPageClicked = (pageNumber: number) => {
                this.$scope.currentPage = pageNumber;
            };

            this.$scope.onPreviousClicked = () => {
                if (this.$scope.currentPage > 0) {
                    this.$scope.currentPage--;
                }
            };

            this.$scope.onNextClicked = () => {
                if (this.$scope.currentPage < this.$scope.pages.length) {
                    this.$scope.currentPage++;
                }
            };
        }

        setIssuesDebounced = _.debounce(() => {
            this.setIssues();
            this.$scope.$digest();
        }, 500);

        setIssues() {
            // cancel previous request
            if (!!this.issuesLoadCanceller) {
                this.issuesLoadCanceller.resolve();
            }
            this.issuesLoadCanceller = this.$q.defer();

            if (!!this.$scope.githubUser
                && !!this.$scope.selectedRepositoryName
                && this.$scope.selectedRepositoryName !== selectRepositoryOption.name) {
                this.githubDataService.getIssues(
                    this.$scope.githubUser,
                    this.$scope.selectedRepositoryName,
                    this.$scope.currentPage,
                    this.$scope.perPage,
                    this.issuesLoadCanceller.promise)
                    .then((response: Data.IGetIssuesResponse) => {

                        this.$scope.pages = [];
                        for (var i = 1; i <= response.pageCount; i++) {
                            this.$scope.pages.push(i);
                        }

                        this.$scope.issues = response.issues;
                    })
                    .catch((response: Data.IGetIssuesResponse) => {
                        this.$scope.issues = null;
                    });
            } else {
                this.$scope.issues = null;
            }
        }
    }

    export function issuesGridDirective($timeout: ng.ITimeoutService, $q: ng.IQService) {
        return {
            restrict: 'AEC',
            scope: {
                githubUser: '=',
                selectedRepositoryName: '='
            },
            templateUrl: '/app/searchPage/issuesGrid/issuesGridDirective.html',
            require: ['sgccIssuesGrid'],
            link: (scope: IIssuesGridDirectiveScope, element: ng.IAugmentedJQuery, attrs, ctrlArr) => {
            },
            controller: 'sgccIssuesGridController'
        };
    }
    issuesGridDirective.$inject = ['$timeout', '$q'];
}