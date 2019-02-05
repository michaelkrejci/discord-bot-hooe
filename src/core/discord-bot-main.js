"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const token = require("../../token.json");
const config = require("../../config.json");
const version_extractor_1 = require("../minecraft/version-extractor");
class DiscordBotMain {
    static main() {
        console.log('Hello World');
        const client = new Discord.Client();
        // TODO do shit
        const minecraftVersionExtractor = new version_extractor_1.VersionExtractor();
        client.once('ready', () => {
            console.log('client ready!');
        });
        // TODO handle promise
        // FIXME do not commit token!
        client.login(token.data);
        console.log('started client with token [' + token.data + ']');
        client.on('message', message => {
            if (message.content.startsWith(config.prefix)) {
                message.channel.send('Pong.');
                message.channel.send(minecraftVersionExtractor.getMotd());
            }
        });
        return 0;
    }
}
exports.DiscordBotMain = DiscordBotMain;
//# sourceMappingURL=discord-bot-main.js.map