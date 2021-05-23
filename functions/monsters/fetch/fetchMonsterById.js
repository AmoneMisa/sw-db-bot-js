const axios = require('axios');

module.exports =  function fetchMonsterById(id) {
    return axios.get(`http://localhost:8080/monster/${id}`);
};