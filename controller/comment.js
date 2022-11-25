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
    let totality = {};
    const current = query.current || 1;
    const pageSize = query.pageSize || 10;
    const sql = `select comment.*, b.name as toName, b.content as toContent from comment left join (select * from comment where toId is null) b on comment.toId = b.id order by createTime DESC limit ${(current-1) * pageSize},${pageSize};`
    const sqlCnt = `SELECT COUNT(id) total FROM comment;`
    const list = await exec(sql);
    const res = await exec(sqlCnt);
    totality.list = list;
    totality.total = res[0].total;
    totality.current = Number(current);
    totality.pageSize = Number(pageSize);
    return totality;
}

module.exports = {
    addComment,
    getCommentList
}