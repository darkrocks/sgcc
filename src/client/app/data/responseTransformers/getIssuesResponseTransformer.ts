/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    export var getIssuesResponseTransformer = (dataString: string) => {
        var issues: any[] = JSON.parse(dataString);
        _.forEach(issues, (issue) => {
            issue.created_at = new Date(issue.created_at);
        });
        return issues;
    };
}
