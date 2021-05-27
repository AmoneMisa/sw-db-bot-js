const fetchMonsters = require('./fetch/fetchMonsters');
const formatMonsterItem = require('./format/formatMonsterItem');
const formatFilterString = require('./format/formatFilterString');
const dictionary = require('../../dictionaries/main');

module.exports = function (session) {
    session.page = session.page || 0;
    session.sortBy = session.sortBy || undefined;
    session.sortAsc = session.sortAsc || undefined;

    return fetchMonsters({...session.filter, source: true}, session.page, session.sortBy, session.sortAsc)
        .then(r => {
            let message = "";

            if (Object.keys(session.filter).length) {
               message += `${dictionary[session.language].updateFilter}${formatFilterString(session.filter, session.language)}\n\n`;
            }

            if (r.data.totalElements === 0) {
                message += `${dictionary[session.language].getResult}`;
            } else {
                for (let monster of r.data.content) {
                    message += formatMonsterItem(monster) + "\n";
                }
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

            let form = {
                reply_markup: {
                    inline_keyboard: [buttons, [{
                        text: "Select",
                        callback_data: "monsters.by_id"
                    }], [{
                        text: "Sort",
                        callback_data: "monsters.result.sort"
                    }], [{
                        text: "Filter",
                        callback_data: "monsters.filter"
                    }, {
                        text: "Help",
                        callback_data: "monsters.help"
                    }]]
                }
            };

            return {text: message, form: form};
        })
        .catch(e => console.error(e));
};