const { exec, escape } = require('../db/mysql');
const xss = require('xss')
const getIp = require('../service/getIp');

/**
 * add comment
 * @param {Object} request 
 * @returns comment id
 */
const addComment = async (request) => {
    const city = await getIp(request.header['x-forwarded-for']);
    const content = xss(request.request.body.content);
    const name = xss(request.request.body.name);
    const toId = request.request.body.toId || null;
    const sql = `insert into comment (toId, name, ip, content) values (${toId}, "${name}", '${city}', '${content}');`
    const res = await exec(sql);
    return {
        id: res.insertId
    }
}

const getCommentList = async (query) => {
    console.log('query',query);
    const current = query.current || 1;
    const pageSize = query.pageSize || 10;
    const sql = `select comment.*, b.name as toName, b.content as toContent from comment left join (select * from comment where toId is null) b on comment.toId = b.id limit ${(current-1) * pageSize},${pageSize};`
    const list = await exec(sql);
    return list;
}

module.exports = {
    addComment,
    getCommentList
}