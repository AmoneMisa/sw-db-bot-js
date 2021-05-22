const axios = require('axios');

module.exports = function (filter, page, sortBy, sortAsc) {
    return axios.post("http://localhost:8080/monster/search", filter, {
        params: {
            page: page,
            sort: sortBy ? `${sortBy},${sortAsc ? "asc" : "desc"}` : undefined
        }
    })
};
