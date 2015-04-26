/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    export var issueResponseTransformer
        = (dataString: string, headers: () => {}) => {
        var issue: any = JSON.parse(dataString);

        var repsonse: IGetIssueResponse = {
            errorMessage: null,
            issue: issue
        };
        repsonse.issue.created_at = new Date(issue.created_at);
        return repsonse;
    };
}
