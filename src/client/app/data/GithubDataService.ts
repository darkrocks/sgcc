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

    export class GithubDataService {
        static $inject = ['$http', '$q', 'sgccGithubApiUrl']

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private githubApiUrl: string) {
        }

        getRepositiries(userName: string, canceller?: ng.IPromise<any>): ng.IPromise<IGetRepositiriesResponse> {
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
                            errorMessage = data.data.message;
                            break;
                    }
                    return this.$q.reject({
                        repositories: null,
                        errorMessage: errorMessage
                    });
                });
        }
    }
}