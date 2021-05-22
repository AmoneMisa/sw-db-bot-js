const bot = require('../../bot');
const fetchMonsters = require('./fetch/fetchMonsters');
const fetchMonsterById = require('./fetch/fetchMonsterById');
const formatMonsterItem = require('./format/formatMonsterItem');
const sendMonster = require('./sendMonster');

module.exports = function getResult(session, callback) {
    session.page = session.page || 0;
    session.sortBy = session.sortBy || undefined;
    session.sortAsc = session.sortAsc || undefined;

    fetchMonsters({...session.filter, source: true}, session.page, session.sortBy, session.sortAsc)
        .then(r => {
            if (r.data.totalElements === 0) {
                bot.sendMessage(callback.message.chat.id, "Ничего не найдено");
                return;
            } else if (r.data.totalElements === 1) {
                let monster = r.data.content[0];
                fetchMonsterById(monster.id)
                    .then((r) => {
                        sendMonster(callback.message.chat.id, r.data);
                    });
                return;
            }

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

            bot.sendMessage(callback.message.chat.id, message, {
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
        })
        .catch(e => console.error(e));
};