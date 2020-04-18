"use strict";
module.exports.publicDir = process.env.publicDir || '/public';

module.exports.os = require("os");
module.exports.domain = process.env.domain_name || this.os.hostname();
module.exports.cores = process.env.cores || this.os.cpus().length;
module.exports.port = process.env.PORT || 80;
module.exports.telegram_api = process.env.telegram_api || "https://api.telegram.org";
module.exports.disable_dotenv = process.env.disable_dotenv == 'true';

let bots_raw = process.env.bots.split(';');
module.exports.bots = [];
bots_raw.forEach(bot => {
    bot = bot.split('|');
    module.exports.bots[bot[0]] = {
        name: bot[0],
        username: bot[1],
        token: bot[2],
        path: bot[3]
    }
});