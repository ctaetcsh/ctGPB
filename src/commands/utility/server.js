const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "server",
                type: "utility",
                description: "Get basic server info.",
                usage: "No arguments required.",
                aliases: ["guild"],
                saying: "Server.",
                cooldown: 2
            });
        }

        main(msg) {
            const guildEmbed = new Embed()
                //.setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle("Information about "+msg.guild.name)

                .setThumbnail(msg.guild.iconURL())
                .addFields(
                    { name: "Server Owner", value: `<@!${msg.guild.ownerID}>`, inline: true },
                    { name: "Created on", value: new Date(msg.guild.createdAt).toLocaleString(), inline: true },
                    { name: "Server ID", value: msg.guild.id, inline: true },
                    { name: "Voice Region", value: msg.guild.region, inline: true },

                    { name: "Member Count", value: msg.guild.memberCount, inline: true },
                    { name: "# of Roles", value: msg.guild.roles.cache.size, inline: true },
                    { name: "# of Channels", value: msg.guild.channels.cache.size, inline: true },
                    { name: "# of Emojis", value: msg.guild.emojis.cache.size, inline: true },
                    
                    
                    
                );
            msg.send(guildEmbed);
        }
    };