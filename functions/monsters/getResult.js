const fetchMonsters = require('./fetch/fetchMonsters');
const formatMonsterItem = require('./format/formatMonsterItem');
const formatFilterString = require('./format/formatFilterString');
const dictionary = require('../../dictionaries/main');
const buttonsDictionary = require('../../dictionaries/buttons');

module.exports = function (session) {
    session.page = session.page || 0;
    session.sortBy = session.sortBy || undefined;
    session.sortAsc = session.sortAsc || undefined;

    return fetchMonsters({...session.filter, source: true}, session.page, session.sortBy, session.sortAsc)
        .then(r => {
            let message = "";

            if (Object.keys(session.filter).length) {
               message += `${dictionary[session.language.text].updateFilter}${formatFilterString(session.filter, session.language.text)}\n\n`;
            }

            if (r.data.totalElements === 0) {
                message += `${dictionary[session.language.text].getResult}`;
            } else {
                for (let monster of r.data.content) {
                    message += formatMonsterItem(monster) + "\n";
                }
            }

            let buttons = [];

            if (!r.data.first) {
                buttons.push({
                    text: buttonsDictionary[session.language.buttons].prevPage,
                    callback_data: "monsters.prev_page"
                });
            }

            if (!r.data.last) {
                buttons.push({
                    text: buttonsDictionary[session.language.buttons].nextPage,
                    callback_data: "monsters.next_page"
                });
            }

            let form = {
                reply_markup: {
                    inline_keyboard: [buttons, [{
                        text: buttonsDictionary[session.language.buttons].select,
                        callback_data: "monsters.by_id"
                    }], [{
                        text: buttonsDictionary[session.language.buttons].sort,
                        callback_data: "monsters.result.sort"
                    }], [{
                        text: buttonsDictionary[session.language.buttons].filter,
                        callback_data: "monsters.filter"
                    }, {
                        text: buttonsDictionary[session.language.buttons].help,
                        callback_data: "monsters.help"
                    }]]
                }
            };

            return {text: message, form: form};
        })
        .catch(e => console.error(e));
};