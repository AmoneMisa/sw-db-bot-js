const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [ ["monsters.filter.type.skills.passive", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard =  (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills..passive.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].passive, "passive"],
        [buttonsDictionary[session.language.buttons].active, "active"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.passive}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.skills\.passive\./, function (session, callback) {
    const [, passive] = callback.data.match(/^monsters\.filter\.type\.skills\.passive\.(.*)$/);
    session.filter.skills[0].passive = passive === "passive";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];