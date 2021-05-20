const { ModerationCommand, Embed } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "prefix",
                type: "moderation",
                description: "Set the bot's prefix.",
                usage: "<prefix>",
                saying: "Don't prefix.",
                cooldown: 2,
                requiredPermissions: ["MANAGE_SERVER"],
                botPermissions: ["SEND_MESSAGES"]
            });
        }

        async main(msg) {
            const prefix = msg.params[0];

            if (!prefix) return msg.send("<:question:844860322065678366> You did not specify a new prefix.");

            msg.guild.setPrefix(prefix);

            msg.send("<:blueok:844860322065678376> The server prefix has been changed to: **"+prefix+"**.");
        }
    };