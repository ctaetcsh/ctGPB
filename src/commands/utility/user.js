const { Command, Embed, RequestCommand } = require("../../../lib");
const ddub = require('dangeroususers');

module.exports =
    class extends RequestCommand {
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

        

        async main(msg) {
            const person = msg.mentions.users.first() || msg.author;
            const personAsGuild = msg.guild.member(person);

            var userdatareturn = await this.request({
              url: "https://ctaetcsh.gay/ctgpb.json",
              params: {
                  output: "JSON",
                  format: "plaintext"
              }
            }).json();

            ddub.checkuser(person.id).then(data => {
              
              var embed = {
                "title": "Information about "+person.tag,
                "description": (userdatareturn[person.id] == undefined ? "No notes were found for this user." : userdatareturn[person.id].notes),
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
                    "value": data.score,
                    "inline": true
                  },
                  {
                    "name": "DDUB Total Reports",
                    "value": data.total_reports,
                    "inline": true
                  }
                ]
              };

            msg.send({embed});
            });

            
        }
    };
