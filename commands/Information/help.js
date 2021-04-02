const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const { readdirSync } = require("fs");
const prefix = require("../../botconfig/config.json").prefix;

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h", "commandinfo", "cmds", "cmd"],
    cooldown: 4,
    useage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
      const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      const dirEmojis = {
        Moderation: "⚙ | ",
        Information: ':page_with_curl: | ',
        Music: "🎵 | ",
        owner: "👑 | ", 
        utility: "🔥 | ",
      }
      readdirSync("./commands/").forEach((dir) => {
        const editedName = `${dirEmojis[dir]} ${dir.toUpperCase()}`;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Tidak ada nama command.";

          let name = file.name.replace(".js", "");

          return `**${name}** | `;
        });

        let data = new Object();

        data = {
          name: editedName,
          value: cmds.length === 0 ? "Sedang proses." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .addFields(categories)
        .setDescription(
`:flag_id:
Gunakan \`${prefix}help\` Untuk melihat informasi lebih detail command dengan cara: \`${prefix}help [command]\`.
:flag_us:
Use \`${prefix}help\` To see more detailed information about the command by way: \`${prefix}help [command]\`.
        `)
        .addField(`Invite Bot  ||Join Server`,`[Click here](https://discord.com/api/oauth2/authorize?client_id=810741403847229460&permissions=8&scope=bot)||[Click here](https://discord.gg/wyjbERjb8e)`)
        .setFooter(
          `Request from ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` to see all command!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
           command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases}\``
            : "This command not have aliases."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "This command not have description."
        )
        .setFooter(
          `Requested from ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};

/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
