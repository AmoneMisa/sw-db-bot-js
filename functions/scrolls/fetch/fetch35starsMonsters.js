const axios = require('axios');
const formatMonsterItem = require('../../monsters/format/formatMonsterItem');
const bot = require('../../../bot');

module.exports = function (session, callback) {
    session.page = session.page || 0;
    session.sortBy = session.sortBy || undefined;
    session.sortAsc = session.sortAsc || undefined;

    axios.post("http://localhost:8080/monster/search", {
        baseStarsGte: 3,
        baseStarsLte: 5,
    }, {
        params: {
            page: session.page,
            sort: session.sortBy ? `${session.sortBy},${session.sortAsc ? "asc" : "desc"}` : undefined
        }
    }).then((r) => {
        let message = "";
        for (let monster of r.data.content) {
            message += formatMonsterItem(monster) + "\n";
        }

        let buttons = [];

        if (!r.data.first) {
            buttons.push({
                text: "Prev page",
                callback_data: "monsters.prev_page"
            });
        }

        if (!r.data.last) {
            buttons.push({
                text: "Next page",
                callback_data: "monsters.next_page"
            });
        }

        sendMessage(session, callback.message.chat.id, message, {
            reply_markup: {
                inline_keyboard: [buttons, [
                    {
                        text: "Select",
                        callback_data: "monsters.by_id"
                    }
                ], [
                    {
                        text: "Sort",
                        callback_data: "monsters.result.sort"
                    }
                ]]
            }
        });
    }).catch(e => console.error(e));
};