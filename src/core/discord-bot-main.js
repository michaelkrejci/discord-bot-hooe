"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const token = require("../../token.json");
const config = require("../../config.json");
const version_extractor_1 = require("../minecraft/version-extractor");
class DiscordBotMain {
    constructor() {
        this.handleUpdate = () => {
            console.log('handling polling of minecraft server');
            const newMotd = this.minecraftVersionExtractor.getMotd();
            if (this.lastMotd !== newMotd) {
                console.log('motds are not equal');
                this.lastMotd = newMotd;
                this.client.channels.get(this.minecraftChannelId).send('--- Haus OÖ Minecraft Server Update ---\nAktuelle Modpack Version: ' + this.lastMotd.substring(12).split(' ')[0]);
            }
        };
        this.client = new Discord.Client();
        this.minecraftVersionExtractor = new version_extractor_1.VersionExtractor(this.handleUpdate);
        this.client.once('ready', () => {
            console.log('client ready!');
            // FIXME make this somewhat customizable
            // remark: channels are stored in a map Map<Snowflake, Channel>, where the key is the channel id
            this.client.channels.forEach((value, key, collection) => {
                if (value.type == 'text') {
                    const textChannel = value;
                    if (textChannel.name === 'minecraftspam') {
                        this.minecraftChannelId = key;
                    }
                }
            });
        });
        this.minecraftStatusInterval = setInterval(this.minecraftVersionExtractor.refresh, config.refreshTime * 1 * 1000);
    }
    start() {
        // TODO handle promise
        // FIXME do not commit token!
        this.client.login(token.data);
        console.log('started client with token [' + token.data + ']');
        this.client.on('message', message => {
            if (!message.content.startsWith(config.prefix) || message.author.bot)
                return;
            switch (message.content.substring(1)) {
                case 'motd':
                    message.channel.send(this.minecraftVersionExtractor.getMotd());
                    break;
                default:
                    message.channel.send('command not implemented!');
            }
        });
        return 0;
    }
}
exports.DiscordBotMain = DiscordBotMain;
//# sourceMappingURL=discord-bot-main.js.map