/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    export interface IApiResponse {
        errorMessage: string;
    }

    export interface IGetRepositiriesResponse extends IApiResponse{
        repositories: Repository[];
    }

    export interface IGetIssuesResponse extends IApiResponse{
        pageCount: number;
        currentPage: number;
        perPage: number;
        issues: Issue[];
    }

    export interface IGetIssueResponse extends IApiResponse{
        issue: Issue;
    }

    export class GithubDataService {
        static $inject = ['$http', '$q', 'sgccGithubApiUrl']

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private githubApiUrl: string) {
        }

        getRepositiries(userName: string, canceller?: ng.IPromise<any>): ng.IPromise<IGetRepositiriesResponse> {
            if (!userName) {
                throw new Error('Parameter not specified');
            }

            var url = this.githubApiUrl + '/users/' + userName + '/repos';
            var options;
            if (!!canceller) {
                options = {
                    timeout: canceller
                };
            }

            return this.$http.get(url, options)
                .then((arg: ng.IHttpPromiseCallbackArg<Repository[]>) => {
                    return {
                        repositories: arg.data,
                        errorMessage: null
                    };
                })
                .catch((data) => {
                    var errorMessage;
                    switch (data.status) {
                        case 404:
                            errorMessage = 'User "' + userName + '" not found';
                            break;
                        default:
                            if (data.data) {
                                errorMessage = data.data.message;
                            } else {
                                errorMessage = 'Unknown error';
                            }
                            break;
                    }
                    return this.$q.reject({
                        repositories: null,
                        errorMessage: errorMessage
                    });
                });
        }

        getIssues(
            userName: string,
            repository: string,
            page: number = 1,
            perPage: number = 10,
            canceller: ng.IPromise<any> = null
            ): ng.IPromise<IGetIssuesResponse> {
            if (!userName || !repository) {
                throw new Error('Parameter not specified');
            }

            var url = this.githubApiUrl
                + '/repos/'
                + userName
                + '/'
                + repository
                + '/issues?sort=created&page='
                + page
                + '&per_page='
                + perPage;

            var options = {
                transformResponse: issuesResponseTransformer
            };
            if (!!canceller) {
                (<any>options).timeout = canceller;
            }

            return this.$http.get(url, options)
                .then((arg: ng.IHttpPromiseCallbackArg<IGetIssuesResponse>) => {
                    arg.data.currentPage = page;
                    arg.data.perPage = perPage;
                    return arg.data;
                })
                .catch((data) => {
                    var errorMessage;
                    if (data.data) {
                        errorMessage = data.data.message;
                    } else {
                        errorMessage = 'Unknown error';
                    }
                    return this.$q.reject({
                        pageCount: null,
                        currentPage: null,
                        perPage: null,
                        issues: null,
                        errorMessage: errorMessage
                    });
                });
        }

        getIssue(
            userName: string,
            repository: string,
            number: number,
            canceller: ng.IPromise<any> = null): ng.IPromise<IGetIssueResponse> {
            if (!userName || !repository || !number) {
                throw new Error('Parameter not specified');
            }

            var url = this.githubApiUrl
                + '/repos/'
                + userName
                + '/'
                + repository
                + '/issues/' +
                number;

            var options = {
                transformResponse: issueResponseTransformer
            };
            if (!!canceller) {
                (<any>options).timeout = canceller;
            }

            return this.$http.get(url, options)
                .then((arg: ng.IHttpPromiseCallbackArg<IGetIssueResponse>) => {
                    return arg.data;
                })
                .catch((data) => {
                    var errorMessage;
                    if (data.statusText) {
                        errorMessage = data.statusText;
                    } else {
                        errorMessage = 'Unknown error';
                    }
                    return this.$q.reject({
                        issue: null,
                        errorMessage: errorMessage
                    });
                });
        }

    }
}