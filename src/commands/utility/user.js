const { Command, Embed } = require("../../../lib");
const ddub = require('dangeroususers');

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "user",
                type: "utility",
                description: "Get basic user info.",
                usage: "<optional user>",
                aliases: ["usr","userinfo"],
                saying: "Stop stalking.",
                cooldown: 2
            });
        }

        formatDate(date) {
            const dateOptions = { dateStyle: "full", timeStyle: "short" };
            return new Date(date).toLocaleString("en-US", dateOptions).split(" at").join("\n");
        }

        

        main(msg) {
            const person = msg.mentions.users.first() || msg.author;
            const personAsGuild = msg.guild.member(person);
            //ddub.checkuser(person.id).then(data => holyfuck = data);

            var embed = {
                "title": "Information about "+person.tag,
                "description": "No notes were found for this user.",
                "thumbnail": {
                  "url": person.displayAvatarURL()
                },
                "fields": [
                  {
                    "name": "Joined Server",
                    "value": this.formatDate(personAsGuild.joinedAt),
                    "inline": true
                  },
                  {
                    "name": "Account Created",
                    "value": this.formatDate(person.createdAt),
                    "inline": true
                  },
                  {
                    "name": "ID",
                    "value": person.id,
                    "inline": true
                  },
                  {
                    "name": "Highest Role In This Server",
                    "value": personAsGuild.roles.highest,
                    "inline": true
                  },
                  {
                    "name": "DDUB Abuse Score",
                    "value": "Error",
                    "inline": true
                  },
                  {
                    "name": "DDUB Total Reports",
                    "value": "Error",
                    "inline": true
                  }
                ]
              };

            msg.send({embed});
        }
    };
