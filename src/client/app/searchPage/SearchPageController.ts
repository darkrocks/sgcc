/**
 * Created by user on 25.04.2015.
 */
module Sgcc.SearchPage {
    'use strict';

    export var selectRepositoryOption: Data.Repository = new Data.Repository(-1, '- Select a Repository -');
    export var defaultPerPage = 10;

    export class SearchPageController {
        static $inject = ['$scope', 'sgccUrlService'];

        constructor(private $scope: any, private urlService: UrlService) {
            this.urlStateToScope(this.urlService.getState());

            var onRouteExternalUpdateUnbind = urlService.onRouteExternalUpdate((urlState: UrlState) => {
                this.urlStateToScope(urlState);
            });

            $scope.$watch(() => this.$scope.githubUser, () => {
                this.updateUrlDebounced();
            });

            $scope.$watch(() => this.$scope.selectedRepositoryName, () => {
                this.updateUrl();
            });

            $scope.$watch(() => this.$scope.currentPage, () => {
                this.updateUrl();
            });

            $scope.$watch(() => this.$scope.perPage, () => {
                this.updateUrl();
            });

            $scope.$on('$destroy', function() {
                onRouteExternalUpdateUnbind();
            });

            $scope.onUserChange = () => {
                this.$scope.currentPage = 1;
            };

            $scope.onSelectedRepositoryChange = () => {
                this.$scope.currentPage = 1;
            };
        }

        urlStateToScope(urlState: UrlState) {
            this.$scope.githubUser = urlState.githubUser;
            this.$scope.selectedRepositoryName = urlState.selectedRepositoryName;
            this.$scope.currentPage = urlState.currentPage;
            if (!this.$scope.currentPage) {
                this.$scope.currentPage = 1;
            }
            this.$scope.perPage = urlState.perPage;
            if (!this.$scope.perPage) {
                this.$scope.perPage = defaultPerPage;
            }
        }

        updateUrlDebounced = _.debounce(() => {
                this.updateUrl();
            }
        , 500);

        updateUrl() {
            this.urlService.updateUrl(
                this.$scope.githubUser,
                this.$scope.selectedRepositoryName,
                this.$scope.currentPage,
                this.$scope.perPage
            );
        }
    }
}