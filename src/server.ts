import { app } from "./app";
import { env } from "./config/env";
import { offlineSyncService } from "./modules/offline-sync/offline-sync.runtime";

async function bootstrap(): Promise<void> {
  await offlineSyncService.init();
  offlineSyncService.start();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Serveur backend actif sur le port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Echec du demarrage du serveur", error);
  process.exit(1);
});
