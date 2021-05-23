const axios = require('axios');
const { apiHost } = require('../../../config');

module.exports = function (filter, page, sortBy, sortAsc) {
    return axios.post(`${apiHost}monster/search`, filter, {
        params: {
            page: page,
            sort: sortBy ? `${sortBy},${sortAsc ? "asc" : "desc"}` : undefined
        }
    })
};
