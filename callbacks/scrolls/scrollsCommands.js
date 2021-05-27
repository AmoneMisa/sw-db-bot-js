module.exports = [["scrolls.close", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}], ["scrolls.again", function (session, callback) {

}]];