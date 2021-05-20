const bot = require('../../bot');
const fetchMonsters = require('./fetchMonsters');
const fetchMonsterById = require('./fetchMonsterById');
const formatMonsterItem = require('./formatMonsterItem');
const formatMonster = require('./formatMonster');

module.exports = function getResult(session, callback) {
    session.page = session.page || 0;
    session.sortBy = session.sortBy || undefined;
    session.sortAsc = session.sortAsc || undefined;

    fetchMonsters(session.filter, session.page, session.sortBy, session.sortAsc)
        .then(r => {
            if (r.data.totalElements === 0) {
                bot.sendMessage(callback.message.chat.id, "Ничего не найдено");
                return;
            } else if (r.data.totalElements === 1) {
                let monster = r.data.content[0];
                fetchMonsterById(monster.id)
                    .then((r) => {
                        bot.sendMessage(callback.message.chat.id, formatMonster(r.data));
                    });
                return;
            }

            let message = "";
            for (let monster of r.data.content) {
                console.log(monster);
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