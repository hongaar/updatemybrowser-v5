import { command } from "bandersnatch";

export const all = command("all").action(async ({}, commandRunner) => {
  async function run(command: string) {
    console.log(`
================================================================================
Running ${command}...
================================================================================
`);
    return commandRunner(command);
  }

  await run("update dict");
  await run("update description");
  await run("update version");
  await run("update wikipediaUrl");
  await run("update summary");
  await run("update features");
});
