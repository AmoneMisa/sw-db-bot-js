const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.amount", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.amount.${leaderSkill.toLowerCase()}`
    }));

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.leaderSkill.amount}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["10", "13", "15", "16"]),
                buildKeyboard(["17", "18", "19", "20"]),
                buildKeyboard(["21", "22", "23", "24"]),
                buildKeyboard(["25", "26", "27", "28"]),
                buildKeyboard(["30", "31", "33", "35"]),
                buildKeyboard(["38", "40", "41", "44"]),
                buildKeyboard(["48", "50", "55"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.amount\./, function (session, callback) {
    let amounts = ["10", "13", "15", "16", "17", "18", "19", "20", "21", "22", "23",
        "24", "25", "26", "27", "28", "30", "31", "33", "35", "38", "40", "41", "44", "48", "50", "55"];
    const [, amount] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.amount\.(.*)$/);

    for (let _amount of amounts) {
        if (amount === _amount)
            session.filter.leaderSkill.amount = parseInt(amount);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];