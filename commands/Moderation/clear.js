module.exports = {
    name : 'clear',
    category : 'Moderation',
    aliases: '',
    usage: ['clear'],
    description : 'to clear message',
    run: async (client, message, args, user, text, prefix) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You not have permission')
        if(!args[0]) return message.channel.send('Pliss specify your amount(1-99)')
        if(isNaN(args[0])) return message.channel.send('only number 1-99')
        if(parseInt(args[0]) > 99) return message.channel.send('max number to purge is 99')

            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                 .catch(err => console.log(err))
            message.channel.send(`Deleted ${args[0]} message!`).then(m => m.delete({ timeout : 5000}))
    }
}