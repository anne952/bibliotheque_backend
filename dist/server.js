"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
app_1.app.listen(env_1.env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Serveur backend actif sur le port ${env_1.env.port}`);
});
//# sourceMappingURL=server.js.map