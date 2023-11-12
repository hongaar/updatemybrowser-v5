import { getExpandedBrowsers } from "@updatemybrowser/client";
import { highestVersion } from "@updatemybrowser/core";
import { readFile } from "fs/promises";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const browsers = await getExpandedBrowsers();

  const umb = await readFile(process.cwd() + "/src/app/umb.js/umb.js", "utf8");

  let umbBrowsers = await readFile(
    process.cwd() + "/src/app/umb.js/umb.browsers.js",
    "utf8",
  );

  const replacements = browsers.flatMap((browser) => [
    {
      key: `{${browser.slug.current}.current}`,
      value: highestVersion(
        browser.releases?.map((item) => item.currentVersion) || [],
      ),
    },
    {
      key: `{${browser.slug.current}.minimum}`,
      value: String(
        parseInt(
          highestVersion(
            browser.releases?.map((item) => item.currentVersion) || [],
          ),
          10,
        ) - 1,
      ),
    },
  ]);

  replacements.forEach(({ key, value }) => {
    umbBrowsers = umbBrowsers.replace(key, value);
  });

  return new NextResponse(`${umb}\n\n${umbBrowsers}`, {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
}
