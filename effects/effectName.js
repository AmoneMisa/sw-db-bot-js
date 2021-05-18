const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

let neutralList = "- Neutral -\n" +
    "Increase ATB | Decrease ATB | Cleanse | Heal\n" +
    "Revive | Remove Buff | Ignore DEF | Additional Turn\n" +
    "Detonate Bomb | Steal Buff | Reduce Cooltime | Increase Cooltime\n" +
    "Self-Heal | Anti-Revive | Transfer Debuff | Additional Attack\n" +
    "Increase Buff Duration | Decrease Debuff Duration | Self-Harm\n" +
    "Elemental Advantage | Ally Attack | Destroy HP\n" +
    "Decrease Damage | Increase Debuff Duration | Redistribute HP\n" +
    "Ignore Damage Reduction | Guaranteed Critical Hit | Seal\n" +
    "Debuff Bonus Damage | Decrease Buff Duration | Ignore Resistance\n" +
    "Spend Knowledge | Detonate Continuous Damage | Absorb ATB\n" +
    "Buff Bonus Damage | Increase Attack Critical Chance | Guaranteed Crushing Hit\n" +
    "Increase Damage | Accumulate MAX HP | Accumulate ATK \n" +
    "Accumulate DEF | Transfer Buff \n";

let debuffList = "- Debuff -\n" +
    "Glancing Hit | Decrease ATK | Decrease DEF | Decrease SPD\n" +
    "Beneficial Effects Blocked | Bomb | Provoke | Sleep\n" +
    "Continuous DMG | Freeze | Stun | Disturb HP Recovery\n" +
    "Silence | Brand | Oblivious | Cleanse Block\n" +
    "Suppress | Death Curse\n";

let buffList = "- Buff -\n" +
    "Increase ATK | Increase DEF | Increase CRI Rate | Increase CRI Resist\n" +
    "Increase SPD | Recovery | Counter | Immunity | Invincible \n" +
    "Reflect DMG | Shield | Endure | Defend | Protect Soul\n" +
    "Threat | Gain Knowledge | Magic Power Explosion | Vampire\n";

module.exports = [["monsters.filter.type.skills.effects.effect.name", function (session, callback) {
    let effectsList = "Введите название эффекта из списка.\n";
    let type = session.filter.skills[0].effects[0].effect.type;
    if (type) {
        if (type === "neutral") {
            effectsList += neutralList;
        } else if (type === "buff") {
            effectsList += buffList;
        } else if (type === "debuff") {
            effectsList += debuffList;
        }
    } else {
        effectsList += neutralList;
        effectsList += debuffList;
        effectsList += buffList;
    }

    bot.sendMessage(callback.message.chat.id, effectsList, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.skills[0].effects[0].effect.name = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
}]];