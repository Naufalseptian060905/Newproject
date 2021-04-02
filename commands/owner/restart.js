const discord = require('discord.js');
module.exports = {
    name : 'restart',
    category : 'owner',
    aliases: 're',
    usage: ['restart/re'],
    description : 'for restart bot',
    run: async (client, message, args, user, text, prefix) => {
        if (message.author.id !== '537238881083326505') {
            return message.reply(`Kamu Tidak Bisa Menggunakan Command Ini!`)
        }
        await message.reply(`Restarting bot...`)
        process.exit(1);
    }
}