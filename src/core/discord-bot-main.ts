import * as Discord from 'discord.js';
import * as token from '../../token.json';
import * as config from '../../config.json';
import {VersionExtractor} from "../minecraft/version-extractor";
import {Snowflake, TextChannel} from "discord.js";

export class DiscordBotMain {
    private client: Discord.Client;
    private minecraftVersionExtractor: VersionExtractor;
    private minecraftStatusInterval: number | NodeJS.Timeout;

    private minecraftChannelId: Snowflake;

    private lastMotd: string;

    constructor() {
        this.client = new Discord.Client();

        this.minecraftVersionExtractor = new VersionExtractor(this.handleUpdate);

        this.client.once('ready', () => {
            console.log('client ready!');

            // FIXME make this somewhat customizable
            // remark: channels are stored in a map Map<Snowflake, Channel>, where the key is the channel id
            this.client.channels.forEach((value, key, collection) => {
                if (value.type == 'text') {
                    const textChannel = <TextChannel>value;
                    if (textChannel.name === 'minecraftspam') {
                        this.minecraftChannelId = key;
                    }
                }
            });
        });
        this.minecraftStatusInterval = setInterval(this.minecraftVersionExtractor.refresh, (<any>config).refreshTime * 60 * 1000)
    }

    public start(): number {

        // TODO handle promise
        // FIXME do not commit token!
        this.client.login((<any>token).data);
        console.log('started client with token [' + (<any>token).data + ']');

        this.client.on('message', message => {
            if (!message.content.startsWith((<any>config).prefix) || message.author.bot) return;

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

    private handleUpdate = () => {
        console.log('handling polling of minecraft server');

        const newMotd = this.minecraftVersionExtractor.getMotd();

        if (this.lastMotd !== newMotd) {
            console.log('motds are not equal');
            this.lastMotd = newMotd;
            (<TextChannel>this.client.channels.get(this.minecraftChannelId)).send('--- Haus OÖ Minecraft Server Update ---\nAktuelle Modpack Version: ' + this.lastMotd.substring(12).split(' ')[0]);
        }
    }
}
