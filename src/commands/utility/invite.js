const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "invite",
                type: "utility",
                description: "Invite link for Mr.Grape.",
                usage: "No arguments required",
                saying: "I just gave it to you!",
                cooldown: 2
            });
        }

        main(msg) {
            const invite = new Embed()
                .setTitle("Add ctGPB to Your Server")
                .setDescription("While ctGPB is designed to be general purpose, it has functionality that only works on certain servers. If you like, you can fork ctGPB into your own bot.")
                .addFields(
                    {
                        name: "Add Bot", value: `
                        [OAtuh2 Invite Link](${this.client.invite})`,
                        inline: true
                    },
                    {
                        name: "Join Primary Server", value: `
                        [Invite to The Knowhere Bridge](https://discord.gg/q5PEuZ3T2u)`,
                        inline: true
                    }
                );
            msg.send(invite);
        }
    };