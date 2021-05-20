const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "purge",
                type: "moderation",
                aliases: ["prune", "clean"],
                description: "Purge messages from a channel.",
                usage: "<number>",
                cooldown: 2,
                saying: "Don't spam this command.",
                requiredPermissions: ["MANAGE_MESSAGES"]
            });
        }

        async main(msg) {
            const number = +msg.params[0];

            if (!number) return msg.send("<:modquestion:844860322002501642> You did not specify a valid number of messages to delete.");

            const [iterations, leftover] = [~~(number / 100), number % 100];

            for (let i = 0; i < iterations; i++) await msg.channel.bulkDelete(100);
            if (leftover > 0) await msg.channel.bulkDelete(leftover);
            
            const confirm = await msg.send("<:modok:844860321448984587> Purged "+leftover+" messages successfully.");
            setTimeout(() => { confirm.delete(); }, 8000);
        }
    };