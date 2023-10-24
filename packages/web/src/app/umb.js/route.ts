import { readFile } from "fs/promises";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const js = await readFile(process.cwd() + "/src/app/umb.js/umb.js", "utf8");

  return new NextResponse(js, {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
}
