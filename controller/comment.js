const { exec, escape } = require('../db/mysql');
const xss = require('xss')
const getIp = require('../service/getIp');

const addComment = async (request) => {
    const city = await getIp(request.header['x-forwarded-for']);
    const content = xss(request.request.body.content);
    const name = xss(request.request.body.name);
    const toId = request.request.body.id || null;
    const sql = `insert into comment (toId, name, ip, content) values (${toId}, "${name}", '${city}', '${content}');`
    const res = await exec(sql);
    return {
        id: res.insertId
    }
}

module.exports = {
    addComment
}