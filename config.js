const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    Bot: {
        token: process.env.bot_token,
        prefix: "+l",
        intents: "all",
        database: {
            type: "default",
            path: "./db/",
            tables: ["leaf"],
            promisify: false
        },
        respondOnEdit: {
            commands: true
        },
        suppressAllErrors: true,
        errorMessage: ["", "{newEmbed:{title:An Error has occured}{description:Something went wrong}{color:#FB4413}}", "{actionRow:{button:Support Server:5:https\\://discord.gg/WgQjZs6XhS}}"]
    }
}