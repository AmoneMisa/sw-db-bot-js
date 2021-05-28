const types = require('../../dictionaries/scrolls');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');
const getMonstersMessage = require('../../functions/scrolls/getMonstersMessage');
const fetchRandomMonsters = require('../../functions/scrolls/fetchRandomMonsters');
const scrollsCounter = require('../../functions/scrolls/scrollsCounter');

module.exports = [[/^scrolls\.type\./, function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorScrollsMessageId = callback.message.message_id;
    const [, type] = callback.data.match(/^scrolls\.type\.(.*)$/);
    session.scrolls.type = types[type];

    fetchRandomMonsters(types[type], session.scrolls.counter ? session.scrolls.counter : 1)
        .then(scrollsCounter(session))
        .then(r => {
            session.scrolls.monsters = r.data;
            session.scrolls.page = 0;
            let {text, form} = getMonstersMessage(session, callback);

            sendMessage(session, callback.message.chat.id, text, form)
                .then(msg => session.scrolls.listMessageId = msg.message_id);
        }).catch(e => {
        console.error(e);
    });
}]];