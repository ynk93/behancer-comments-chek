const express = require('express');
const GetComments = require('./class/getComments');

const server = express();

var getComments;


async function start() {

    await serverInit();

}

async function checkComments(userUrl) {

    const checkSymbolsStep = 10;

    const comments = await getComments.init();

    var checked = false;

    var check = comments.forEach(function (item) {

        const commentId = item.id;
        const commentComment = item.comment.replace(/<[^>]*>?/gm, '');
        const commentDate = item.posted_on;
        const commentUserId = item.user.id;
        const commentUserName = item.user.name;
        const commentUserUrl = item.user.url;

        var userCheck = false;
        var stringToEngCheck = false;

        var localeString = commentComment.replace(/[^a-zA-Z]+/g, '');

        // user url compare check
        if (commentUserUrl == userUrl) {
            userCheck = true;
        }

        // comment english letters minimum 10 chars checks
        if (localeString.length >= checkSymbolsStep) {
            stringToEngCheck = true;
        }

        if (userCheck == true && stringToEngCheck == true) {
            checked = true;
        }

    });

    switch(checked) {
        case true:
            return true;
            break;
        case false:
            return false;
            break;
    }

}

async function serverInit() {

    server.get('/comment/', async function (req, res) {
        var projectUrl = req.query.projectUrl;
        var userUrl = req.query.userUrl;

        console.log(projectUrl, userUrl);

        getComments = new GetComments(projectUrl);

        var result = await checkComments(userUrl);

        console.log(result);

        res.json(result);

    });

    server.listen(3000);

}

start();