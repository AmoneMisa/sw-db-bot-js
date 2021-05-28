const axios = require('axios');
const {apiHost} = require('../../config');

module.exports = function (type, summonsCount) {
    return axios.get(`${apiHost}scroll?type=${type}&summonsCount=${summonsCount}`);
};