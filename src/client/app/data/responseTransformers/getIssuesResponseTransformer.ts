/**
 * Created by user on 26.04.2015.
 */
module Sgcc.Data {
    'use strict';

    export var getIssuesResponseTransformer
        = (dataString: string, headers: () => {}) => {
        var issues: any[] = JSON.parse(dataString);

        var repsonse: IGetIssuesResponse = {
            errorMessage: null,
            pageCount: null,
            currentPage: null,
            perPage: null,
            issues: []
        };

        _.forEach(issues, (issue) => {
            issue.created_at = new Date(issue.created_at);
            repsonse.issues.push(issue);
        });

        var linkHeader: string = headers()['link'];
        if (linkHeader) {
            var links: string[] = linkHeader.split(',');

            _.forEach(links, (link: string) => {
                if (link.match(/rel="last"/)) {
                    var pageInfos: string[] = link.match(/page=\d*/);
                    if (pageInfos && pageInfos.length > 0) {
                        var pageInfo: string = pageInfos[0];
                        var pageInfoLength = pageInfo.length;
                        repsonse.pageCount = parseInt(pageInfo.substring(5, pageInfoLength), 10);
                    }
                }
            });

            if (!repsonse.pageCount) {
                _.forEach(links, (link: string) => {
                    if (link.match(/rel="prev"/)) {
                        var pageInfos: string[] = link.match(/page=\d*/);
                        if (pageInfos && pageInfos.length > 0) {
                            var pageInfo: string = pageInfos[0];
                            var pageInfoLength = pageInfo.length;
                            repsonse.pageCount = parseInt(pageInfo.substring(5, pageInfoLength), 10) + 1;
                        }
                    }
                });
            }

            if (!repsonse.pageCount) {
                throw new Error('Unable to fetch pagination information');
            }
        }
        return repsonse;
    };
}
