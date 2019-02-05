import * as Discord from 'discord.js';
import * as token from '../../token.json';
import * as config from '../../config.json';
import {VersionExtractor} from "../minecraft/version-extractor";

export class DiscordBotMain {
    public static main(): number {
        console.log('Hello World');
        const client = new Discord.Client();
        // TODO do shit
        const minecraftVersionExtractor = new VersionExtractor();

        client.once('ready', () => {
            console.log('client ready!');
        });

        // TODO handle promise
        // FIXME do not commit token!
        client.login((<any>token).data);
        console.log('started client with token [' + (<any>token).data + ']');

        client.on('message', message => {

            if (message.content.startsWith((<any>config).prefix)) {
                message.channel.send('Pong.');
                message.channel.send(minecraftVersionExtractor.getMotd());
            }
        });

        return 0;
    }
}
