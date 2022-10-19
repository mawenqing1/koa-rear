const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

// // create link
// const con = mysql.createConnection(MYSQL_CONFIG);

// con.connect();
let pool = mysql.createPool(MYSQL_CONFIG);

const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
                connection.release();
            })
        })
        // con.query(sql, (err, res) => {
        //     if (err) {
        //         reject(err);
        //         return;
        //     }
        //     resolve(res);
        // });  
    })
    return promise
};

module.exports = {
    exec,
    escape: mysql.escape
};
