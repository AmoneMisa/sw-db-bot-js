const deleteMessage = require('../../functions/deleteMessage');
const updateMonstersMessage = require('../../functions/scrolls/updateMonstersMessage');
const fetchRandomMonsters = require('../../functions/scrolls/fetchRandomMonsters');
const scrollsCounter = require('../../functions/scrolls/scrollsCounter');

module.exports = [["scrolls.close", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, session.anchorScrollsMessageId);
}], ["scrolls.reset_stats", function (session, callback) {
    session.scrolls.stats = {};
    deleteMessage(callback.message.chat.id, session.messages, session.anchorScrollsMessageId);
}], ["scrolls.again", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    fetchRandomMonsters(session.scrolls.type, session.scrolls.counter)
        .then(scrollsCounter(session))
        .then(r => {
            session.scrolls.page = 0;
            session.scrolls.monsters = r.data;
            updateMonstersMessage(session, callback);
        });
}], ["scrolls.prev_page", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.scrolls.page--;
    updateMonstersMessage(session, callback);
}], ["scrolls.next_page", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.scrolls.page++;
    updateMonstersMessage(session, callback);
}]];