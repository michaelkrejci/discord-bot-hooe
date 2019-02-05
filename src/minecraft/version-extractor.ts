import * as Minestat from './minestat.js';

export class VersionExtractor {

    refreshCallback: () => void;

    constructor(handleUpdate: () => void) {
        this.refreshCallback = handleUpdate;
        Minestat.init('78.104.172.7', 48102, () => {
            console.log("Minecraft server status of " + Minestat.address + " on port " + Minestat.port + ":");
            if(Minestat.online)
            {
                console.log("Server is online running version " + Minestat.version + " with " + Minestat.current_players + " out of " + Minestat.max_players + " players.");
                console.log("Message of the day: " + Minestat.motd);
                console.log("Latency: " + Minestat.latency + "ms");
            }
            else
            {
                console.log("Server is offline!");
            }
        });
    }

    public getMotd(): string {
        return Minestat.motd;
    }

    public refresh = () => {
        Minestat.init('78.104.172.7', 48102, this.refreshCallback);
    }
}
