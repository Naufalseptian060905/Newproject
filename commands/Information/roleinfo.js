const Discord = require("discord.js")
module.exports = {
  name: 'roleinfo',


  run: async (client, message, args, user, text, prefix) => {
    let role;
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You do not have the MANAGE_ROLES permission`).then(m => m.delete({ timeout: 5000 }));
    if (args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first()
    if (args[0] && isNaN(args[0]) && !message.mentions.roles.first()) {
      role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())

      if (!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())) return message.reply(":x: Role Not Found")
    }
    if (args[0] && !isNaN(args[0])) {
      role = message.guild.roles.cache.find(e => e.id == args[0])
      if (!message.guild.roles.cache.has(args[0])) return message.reply(":x: Role Not Found")
    }

    if (!role) return message.reply("You must mention role")
    let rolemembers;
    if (role.members.size > 20) rolemembers = role.members.map(e => `<@${e.id}>`).slice(0, 20).join(", ") + ` and ${role.members.size - 20} more members...`
    if (role.members.size < 20) rolemembers = role.members.map(e => `<@${e.id}>`).join(", ")

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription(`**Role Name:** ${role.name}(<@&${role.id}>)\n\n**Role ID:** **\`${role.id}\`**\n\n**Role Mentionable:** ${role.mentionable.toString().replace("true", "Yes").replace("false", "No")}\n\n**Number of Role Members:** ${role.members.size || 0}`)
      .addField("Role Members;", rolemembers || "Not found")

    message.channel.send(embed)
  }
}