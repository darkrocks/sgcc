/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    export class Issue {
        id: number;
        number: number;
        title: string;
        body: string;
        state: string;
        created_at: Date;
        user: User;
    }
}