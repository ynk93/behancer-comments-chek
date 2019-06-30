const axios = require('axios');
const HTMLParser = require('node-html-parser');

class GetComments {

    constructor(url) {
        this.url = url;
    }

    async init() {
        const url = this.url;

        const comments = await this.getComents();

        return comments['comments'];

    }

    async getProjectId() {
        const splitUrl = this.url.split('/');
        const projectId = splitUrl[4];

        return projectId;
    }

    async getComents() {

        const projectId = await this.getProjectId();

        const commentsUrl = 'https://www.behance.net/comments/project?sort_order=desc&type=project&entity_id=' + projectId;

        const headers = {
            'Accept': '*/*',
            'Referer': 'https://www.behance.net/gallery/62248585/Brand-Identity-Cases-for-Startups-and-SMBs',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        };

        const request = axios.get(commentsUrl, {
            headers: headers
        }).then(function (response) {
            return response.data;
        });

        return await request;

    }

}

module.exports = GetComments;