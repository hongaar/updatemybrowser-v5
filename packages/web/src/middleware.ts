import { match } from "@formatjs/intl-localematcher";
import { defaultLanguage, getLanguageIds } from "@updatemybrowser/client";
import Negotiator from "negotiator";
import { type NextMiddleware } from "next/server";

const redirects = [
  { from: "/browser", to: "/check" },
  { from: "/about", to: "/check" },
  { from: "/about/docs", to: "/widget" },
  { from: "/about/plugins", to: "/widget" },
  { from: "/about/contact", to: "/check" },
  { from: "/about/stats", to: "/check" },
  { from: "/widget.html", to: "/widget" },
];

function getExtension(pathname: string) {
  const match = pathname.match(/\.[0-9a-z]+$/i);
  return match ? match[0] : "";
}

async function getLanguage(request: Request, available: string[]) {
  const requested = new Negotiator({
    headers: Object.fromEntries(request.headers),
  }).languages();

  return match(requested, available, defaultLanguage);
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

  let language = defaultLanguage;
  try {
    language = await getLanguage(request, languages);
  } catch (error) {}

  // Check if there is any redirect for the pathname
  const redirect = redirects.find(({ from }) => from === pathname);
  if (redirect) {
    request.nextUrl.pathname = `/${language}${redirect.to}`;
  } else {
    request.nextUrl.pathname = `/${language}${pathname}`;
  }

  return Response.redirect(request.nextUrl, 307);
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",

    // Optional: only run on root (/) URL
    "/",
  ],
};
