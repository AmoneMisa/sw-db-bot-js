const axios = require('axios');
const { apiHost } = require('../../../config');

module.exports =  function fetchMonsterById(id) {
    return axios.get(`${apiHost}monster/${id}`);
};