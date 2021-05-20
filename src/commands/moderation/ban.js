const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "ban",
                type: "moderation",
                aliases: ["hammer"],
                description: "Ban people.",
                usage: "<mention|userID> <reason>",
                cooldown: 1,
                requiredPermissions: ["BAN_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send('<:modquestion:844860322002501642> You did not specify a user/ID to ban.');

            const target = msg.mentions.members.first() ||
                await msg.guild.members.fetch(msg.params[0]).catch(() => { null; });

            if (!target) return msg.send('<:modquestion:844860322002501642> "'+msg.params[0]+'" is not a valid user/ID.');
            else if (target.id === msg.author.id) return msg.send("<:modwarning:844860321084473354> You cannot ban yourself from this guild. You can optionally right click the server icon and press leave.");
            else if (target.id === this.client.user.id) return msg.send("<:modwarning:844860321084473354> To remove ctGPB, have the owner kick the bot from the guild.");
            else if (!target.bannable) return msg.send("<:moderror:844860321591066634> This user/ID is not bannable. ctGPB may not hare sufficient permissions to ban this user/ID.");

            const reason = msg.params.slice(1).join(" ") || "No reason given";

            target.ban({ reason: reason });

            msg.send(`<:modok:844860321448984587> ${target.user.username} has been banned from the guild.`);

            target.send('<:mod:844860321273348116> You have been banned from '+msg.guild.name+' by **'+msg.author+'**. The following reason was attached to this action: '+reason).catch(() => null);
        }
    };