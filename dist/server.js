"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const offline_sync_runtime_1 = require("./modules/offline-sync/offline-sync.runtime");
async function bootstrap() {
    await offline_sync_runtime_1.offlineSyncService.init();
    offline_sync_runtime_1.offlineSyncService.start();
    app_1.app.listen(env_1.env.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Serveur backend actif sur le port ${env_1.env.port}`);
    });
}
bootstrap().catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Echec du demarrage du serveur", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map