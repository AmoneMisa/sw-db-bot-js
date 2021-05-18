const TelegramBot = require('node-telegram-bot-api');
const token = '1750945348:AAEYGISgU-vV3NZOJ0KbhDAm9FneEhlzCPo';
module.exports = new TelegramBot(token, {polling: true});