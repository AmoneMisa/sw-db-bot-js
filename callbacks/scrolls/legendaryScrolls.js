const axios = require('axios');
const types = require('../../dictionaries/scrolls');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');
const formatMonsterItem = require('../../functions/monsters/format/formatMonsterItem');

module.exports = [[/^scrolls\.legendary_scroll\./, function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    const [, type] = callback.data.match(/^scrolls\.legendary_scroll\.(.*)$/);

    let buttons = [];

    axios.get(`http://localhost:8080/scroll?type=${types.legendaryScroll[type]}&summonsCount=${session.scrolls.counter ? session.scrolls.counter : 1}`)
        .then(r => {
            let countPages = r.data.length % 25;
            session.page = session.page || 0;

            if (session.page > 0) {
                session.page++;
                buttons.push([{
                    text: "Prev page",
                    callback_data: "scrolls.prev_page"
                }]);
            }

            if (countPages > 1 && session.page < countPages) {
                session.page--;
                buttons.push([{
                    text: "Next page",
                    callback_data: "scrolls.next_page"
                }]);
            }

            let monsters = "";

            for (let monster of r.data) {
                monsters += `${formatMonsterItem(monster)}\n`;
            }

            sendMessage(session, callback.message.chat.id, monsters, {
                reply_markup: {
                    inline_keyboard: [buttons,
                        [{
                            text: "Close",
                            callback_data: "scrolls.close"
                        }, {
                            text: "Try again",
                            callback_data: "scrolls.again"
                        }]]
                }
            });
        }).catch(e => {
        console.error(e);
    });
}]];