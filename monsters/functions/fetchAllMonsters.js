const axios = require('axios');

module.exports =  function () {
    return axios.get("http://localhost:8080/monster/");
};