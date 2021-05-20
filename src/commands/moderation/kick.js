const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "kick",
                type: "moderation",
                aliases: ["boot"],
                description: "Kick people.",
                usage: "<mention|userID>",
                cooldown: 2,
                saying: "Don't spam this command.",
                requiredPermissions: ["KICK_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send('<:modquestion:844860322002501642> You did not specify a user/ID to kick.');
            const target = msg.mentions.members.first() || await msg.guild.members.fetch(msg.params[0]);

            if (!target) return msg.send('<:modquestion:844860322002501642> "'+msg.params[0]+'" is not a valid user/ID.');
            else if (msg.author.id === target.id) return msg.send("<:modwarning:844860321084473354> You cannot kick yourself from this guild. You can optionally right click the server icon and press leave.");
            else if (this.client.user.id === target.id) return msg.send("<:modwarning:844860321084473354> To remove ctGPB, have the owner kick the bot from the guild.");
            else if (!target.kickable) return msg.send("<:moderror:844860321591066634> This user/ID is not kickable. ctGPB may not hare sufficient permissions to kick this user/ID.");

            const reason = msg.params.slice(1).join(" ");

            target.kick(reason);

            msg.send(`<:modok:844860321448984587> ${target.user.username} has been kicked from the guild.`);

            target.send('<:mod:844860321273348116> You have been kicked from '+msg.guild.name+' by **'+msg.author+'**. The following reason was attached to this action: '+reason).catch(() => null);
        }
    };