/**
 * Created by user on 25.04.2015.
 */
module Sgcc {
    'use strict';

    angular.module('sgcc.app', [
        'ngRoute',
        'sgcc.issues'
    ])
        .config(routingConfig);
}