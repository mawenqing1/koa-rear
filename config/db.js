const env = process.env.NODE_ENV;

let MYSQL_CONFIG
let REDIS_CONFIG

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
        host: '127.0.0.1',
        user: 'mwq',
        password: 'm147258369.',
        port: '3306',
        database: 'blog'
    }

    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
};

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}