import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextMiddleware } from "next/server";
import { getDefaultLanguageId, getLanguageIds } from "./utils/language";

function getExtension(pathname: string) {
  const match = pathname.match(/\.[0-9a-z]+$/i);
  return match ? match[0] : "";
}

async function getLanguage(request: Request) {
  const headers = Object.fromEntries(request.headers);
  const languages = new Negotiator({ headers }).languages();

  return match(languages, await getLanguageIds(), await getDefaultLanguageId());
}

export const middleware: NextMiddleware = async (request) => {
  const { pathname } = request.nextUrl;
  const extension = getExtension(pathname);

  if (extension) {
    return;
  }

  const languages = await getLanguageIds();

  if (languages.length === 0) {
    throw new Error("No languages found");
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = languages.some(
    (language) =>
      pathname.startsWith(`/${language}/`) || pathname === `/${language}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  const language = await getLanguage(request);

  request.nextUrl.pathname = `/${language}${pathname}`;

  return Response.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",

    // Optional: only run on root (/) URL
    "/",
  ],
};
