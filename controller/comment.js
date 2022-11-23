const { exec, escape } = require('../db/mysql');

const addComment = async (request) => {
    console.log('request',request);
}

module.exports = {
    addComment
}