/**
 * Created by user on 26.04.2015.
 */
/**
 * Created by user on 26.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export interface IRouteParams extends ng.route.IRouteParamsService {
        u: string;
        r: string;
        p: string;
        pp: string;
    }

    export class UrlState {
        constructor(public githubUser: string = null,
                    public selectedRepositoryName: string = null,
                    public currentPage: number = null,
                    public perPage: number = null) {
        }
    }

    export class UrlService {
        static $inject = ['$location', '$routeParams', '$rootScope'];
        private lastSetUrl: string;

        constructor(private $location: ng.ILocationService,
                    private $routeParams: IRouteParams,
                    private $rootScope: ng.IRootScopeService) {
        }

        onRouteExternalUpdate(callback: (urlState: UrlState) => void) {
            // calls callback method only when route was changed by clicking on back/forward buttons in the browser or clicking on a link
            this.$rootScope.$on('$routeUpdate', () => {
                if (!this.isCurrentUrlInternallySet()) {
                    callback(this.getState());
                    this.updateLastSetUrl();
                }
            });
        }

        getState(): UrlState {
            var urlState: UrlState = new UrlState();
            urlState.githubUser = this.$location.search().u;
            urlState.selectedRepositoryName = this.$location.search().r;
            var currentPageString = this.$location.search().p;
            if (currentPageString) {
                urlState.currentPage = parseInt(currentPageString, 10);
            }
            var currentPerPageString = this.$location.search().pp;
            if (currentPerPageString) {
                urlState.perPage = parseInt(currentPerPageString, 10);
            }

            return urlState;
        }

        updateUrl(githubUser: string,
                  selectedRepositoryName: string,
                  currentPage: number,
                  perPage: number) {

            var newUrlState: UrlState = new UrlState(
                githubUser,
                selectedRepositoryName,
                currentPage,
                perPage
            );
            var currentUrlState: UrlState = this.getState();
            if (!angular.equals(newUrlState, currentUrlState)) {
                var routeParams: IRouteParams = {
                    u: null,
                    r: null,
                    p: null,
                    pp: null
                };
                if (newUrlState) {
                    routeParams = {
                        u: newUrlState.githubUser,
                        r: newUrlState.selectedRepositoryName,
                        p: null,
                        pp: null
                    };

                    if (newUrlState.currentPage) {
                        routeParams.p = newUrlState.currentPage.toString();
                    }

                    if (newUrlState.perPage) {
                        routeParams.pp = newUrlState.perPage.toString();
                    }
                }

                this.$location.search(routeParams);
                this.updateLastSetUrl();
            }
        }

        private isCurrentUrlInternallySet() {
            return this.lastSetUrl === this.$location.url();
        }

        private updateLastSetUrl() {
            this.lastSetUrl = this.$location.url();
        }
    }
}