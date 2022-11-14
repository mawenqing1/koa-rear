const { exec } = require('../db/mysql'); 
const xss = require('xss')

/**
 * get blog list
 * @param {String} author 
 * @param {String} keyword 
 * @returns 
 */
const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author) {
        sql += `and author='${author}' `
    };
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    };
    sql += `order by createtime desc;`
    return await exec(sql)
};

/**
 * get blog detail data
 * @param {Number} id 
 * @returns 
 */
const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}';`;
    const rows = await exec(sql);
    await renewRatings(id);
    return rows[0]
}

/**
 * create new blog
 * @param {Object} blogData 
 * @returns 
 */
const newBlog = async (blogData = {}) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const author = blogData.author
    const createTime = Date.now();
    const sql = `insert into blogs (title, content, author, createtime) values ('${title}', "${content}", '${author}', ${createTime});`
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

/**
 * update blog
 * @param {Number} id 
 * @param {Object} blogData 
 * @returns 
 */
const updateBlog = async (id, blogData = {}) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content)
    const sql = `update blogs set title='${title}', content="${content}" where id=${id};`
    const updateData = await exec(sql);
    if(updateData.affectedRows > 0) {
        return true
    }
    return false
}

/**
 * delete blog
 * @param {Number} id 
 * @param {String} author 
 * @returns 
 */
const deleteBlog = async (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}';`
    const delData = await exec(sql);
    if(delData.affectedRows > 0) {
        return true
    }
    return false
}

/**
 * get article count
 * @returns article count
 */
const getBlogCount = async () => {
    const sql = `SELECT COUNT(id) FROM blogs;`
    const count = await exec(sql);
    return count[0]['COUNT(id)'];
}

/**
 * renew article ratings
 * @param {Number} id 
 */
const renewRatings = async (id) => {
    const sql1 = `select ratings from blogs where id=${id};`;
    const res = await exec(sql1);
    const sql2 = `update blogs set ratings='${res[0].ratings + 1}' where id=${id};`
    await exec(sql2);
}

const getTagList = async () => {
    const sql = `select tag, COUNT(*) cnt from blogs group by tag;`
    const res = await exec(sql);
    return res
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
    getBlogCount,
    getTagList
};
