import "dotenv/config";
import { setUncaughtExceptionCaptureCallback } from "node:process";
import {
  runVersionUpdaterForAllReleases,
  runWikipediaUpdaterForAllBrowsers,
  runWikipediaUrlForAllBrowsers,
} from "../src/run.js";

setUncaughtExceptionCaptureCallback(console.log);

console.log(
  "TRANSLATING WIKIPEDIA URLS\n========================================",
);
await runWikipediaUrlForAllBrowsers();

// process.exit(0);

console.log(
  "UPDATING SUMMARY FROM WIKIPEDIA\n========================================",
);
await runWikipediaUpdaterForAllBrowsers();

console.log(
  "UPDATING BROWSER VERSIONS\n========================================",
);
await runVersionUpdaterForAllReleases();
