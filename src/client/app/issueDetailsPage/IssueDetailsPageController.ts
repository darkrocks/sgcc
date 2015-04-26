/**
 * Created by user on 26.04.2015.
 */
module Sgcc.IssueDetailsPage {
    'use strict';

    export interface IIssueDetailsPageRouteParams {
        githubUser: string;
        repo: string;
        number: number;
    }
    export class IssueDetailsPageController {
        static $inject = ['$scope', '$routeParams', 'sgccGithubDataService'];

        constructor(
            private $scope: any,
            private $routeParams: IIssueDetailsPageRouteParams,
            private githubDataService: Data.GithubDataService) {

            this.githubDataService
                .getIssue($routeParams.githubUser, $routeParams.repo, $routeParams.number)
                .then((response: Data.IGetIssueResponse) => {
                    this.$scope.issue = response.issue;
                })
                .catch((response: Data.IGetIssueResponse) => {
                    this.$scope.errorMessage = response.errorMessage;
                });
        }
    }
}