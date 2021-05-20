const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "unban",
                type: "moderation",
                aliases: ["unhammer"],
                description: "Unban people.",
                usage: "<userID|username>",
                cooldown: 2,
                saying: "Don't spam this command.",
                requiredPermissions: ["BAN_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send("<:modquestion:844860322002501642> You did not specify an ID to unban.");

            const bans = await msg.guild.fetchBans();
            
            const ban = bans.find(e => e.user.id === msg.params[0] || e.user.username === msg.params.join(" "))?.user;

            if (!ban) return msg.send("<:modquestion:844860322002501642> Specified user is either not banned or is an invalid user/ID.");

            await msg.guild.members.unban(ban.id);

            msg.send(`<:modok:844860321448984587> ${ban.username} was unbanned successfully.`);
        }
    };