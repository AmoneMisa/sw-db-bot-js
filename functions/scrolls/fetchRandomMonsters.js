const axios = require('axios');

module.exports = function (type, summonsCount) {
    return axios.get(`http://localhost:8080/scroll?type=${type}&summonsCount=${summonsCount}`);
};