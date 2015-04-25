/**
 * Created by user on 25.04.2015.
 */
module Sgcc.Navbar {
    'use strict';

    export function navbarDirective() {
        return {
            restrict: 'AEC',
            templateUrl: '/app/navbar/navbarDirective.html'
        };
    }
    navbarDirective.$inject = ['$window'];
}