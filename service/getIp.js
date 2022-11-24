const fetch = require("node-fetch");

const getIp = async (ip) => {
    const ipResult = await fetch(
        `https://restapi.amap.com/v3/ip?key=660c2b3ee667f5679db9059ae9214da4&ip=${ip}`
    ).then(res => res.json())
    return ipResult.city;
};

module.exports = getIp
