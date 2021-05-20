const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "wolfram",
                type: "fun",
                aliases: ["wa", "wolf", "ask", "question", "givethquestion"],
                description: "Ask a question!",
                usage: "<question>",
                cooldown: 5,
                saying: "Use google nerd."
            });
        }

        async main(msg) {
            if (!msg.params.length) return msg.send("<:question:844860322065678366> You did not supply a question with the command.");

            const queryMsg = await msg.send("<:info:844860322019541043> Processing request with Wolfram Alpha...");
            const { queryresult } = await this.request({
                url: "https://api.wolframalpha.com/v2/query",
                params: {
                    appid: "AEX48V-WJYLXXX3L3",
                    input: msg.params.join(" "),
                    output: "JSON",
                    format: "plaintext"
                }
            }).json();

            if (!queryresult.success) {
                console.log(queryresult);
                queryMsg.delete();
                return msg.send("<:error:844860321705492490> Unable to process this request.");
            }

            const answer = queryresult.pods[1].subpods[0].plaintext;

            queryMsg.delete();
            msg.send("<:greenok:844860321462353940> Wolfram Alpha says: "+answer);
        }
    };