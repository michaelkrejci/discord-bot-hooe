"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Minestat = require("./minestat.js");
class VersionExtractor {
    constructor() {
        Minestat.init('78.104.172.7', 48102, () => {
            console.log("Minecraft server status of " + Minestat.address + " on port " + Minestat.port + ":");
            if (Minestat.online) {
                console.log("Server is online running version " + Minestat.version + " with " + Minestat.current_players + " out of " + Minestat.max_players + " players.");
                console.log("Message of the day: " + Minestat.motd);
                console.log("Latency: " + Minestat.latency + "ms");
            }
            else {
                console.log("Server is offline!");
            }
        });
    }
    getMotd() {
        return Minestat.motd;
    }
}
exports.VersionExtractor = VersionExtractor;
//# sourceMappingURL=version-extractor.js.map