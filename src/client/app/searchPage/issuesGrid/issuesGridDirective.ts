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
    }

    export class IssuesGridController {
        static $inject = ['$scope', '$q', 'sgccGithubDataService'];
        private issuesLoadCanceller: ng.IDeferred<any> = this.$q.defer();

        constructor(private $scope: IIssuesGridDirectiveScope,
                    private $q: ng.IQService,
                    private githubDataService: Data.GithubDataService) {
            this.$scope.$watch(() => this.$scope.githubUser, () => {
                this.setIssues();
            });

            this.$scope.$watch(() => this.$scope.selectedRepositoryName, () => {
                this.setIssues();
            });

        }

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
                    this.issuesLoadCanceller.promise)
                    .then((response: Data.IGetIssuesResponse) => {
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