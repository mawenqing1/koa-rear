const env = process.env.NODE_ENV;

let MYSQL_CONFIG
let REDIS_CONFIG
console.log(env,'env');
if(env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'mwq',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
};

if(env === 'prd') {
    MYSQL_CONFIG = {
        host: '150.158.170.200',
        user: 'mwq',
        password: 'm147258369.',
        port: '16346',
        database: 'blog'
    }

    REDIS_CONFIG = {
        port: 16346,
        host: '150.158.170.200'
    }
};

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}