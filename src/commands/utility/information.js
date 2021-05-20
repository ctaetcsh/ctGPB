const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "information",
                type: "utility",
                description: "Basic info about the bot.",
                usage: "No arguments required.",
                aliases: ["i", "info"],
                saying: "It's not like the info is interesting.",
                cooldown: 2
            });
        }

        main(msg) {
            let uptime = this.client.uptime / 1000;
            let unit = "second(s)";
            if (uptime > 59 && unit === "second(s)") {
                uptime /= 60;
                unit = "minute(s)";
            }
            if (uptime > 59 && unit === "minute(s)") {
                uptime /= 60;
                unit = "hour(s)";
            }
            if (uptime > 23 && unit === "hour(s)") {
                uptime /= 24;
                unit = "day(s)";
            }

            var embed = {
                "title": "General Purpose Bot for Discord",
                "description": "ctGPB is a fork of the Mr. Grape Discord bot and was designed as a general purpose bot to assist with tasks on certain servers. ",
                "thumbnail": {
                  "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "author": {
                  "name": "ctaetcsh/ctGPB",
                  "url": "https://github.com/ctaetcsh/ctGPB",
                  "icon_url": "https://ctaetcsh.gay/ctaetcsh.png"
                },
                "fields": [
                  {
                    "name": "Credits",
                    "value": "ctGPB is maintained and operated by ctaetcsh.\nMr. Grape was created by Kinglalu and DAONE."
                  },
                  {
                    "name": "OSS Disclosure",
                    "value": "ctGPB is Open Source Software licensed under the GNU GPL-3.0 License."
                  },
                  {
                    "name": "Bot Version",
                    "value": this.client.config.version,
                    "inline": true
                  },
                  {
                    "name": "Bot Uptime",
                    "value": Math.floor(uptime)+" "+unit,
                    "inline": true
                  }
                ]
              };

            msg.send({embed});
        }
    };