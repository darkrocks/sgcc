/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    export class GithubDataService {
        static $inject = ['$http', '$q', 'sgccGithubApiUrl']

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private githubApiUrl: string) {
        }

        getRepositiries(userName: string): ng.IPromise<Repository[]> {
            var url = this.githubApiUrl + '/users/' + userName + '/repos';
            return this.$http.get(url)
                .then((arg: ng.IHttpPromiseCallbackArg<Repository[]>) => {
                    return arg.data;
                });
        }
    }
}