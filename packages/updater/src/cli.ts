import "dotenv/config";

import { command, program } from "bandersnatch";
import { setUncaughtExceptionCaptureCallback } from "node:process";
import * as commands from "./updaters/index.js";

setUncaughtExceptionCaptureCallback(console.error);

const update = command("update");

for (const command of Object.values(commands)) {
  update.add(command);
}

const app = program().description("@updatemybrowser-v5/updater").add(update);

app.runOrRepl().catch((err) => {
  console.log("\x1b[37;41mThere was a problem running this command:\x1b[0m");
  console.error(err);
  process.exit(1);
});
