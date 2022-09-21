const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

// create link
const con = mysql.createConnection(MYSQL_CONFIG);

con.connect();

const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });  
    })
    return promise
};

module.exports = {
    exec,
    escape: mysql.escape
};
