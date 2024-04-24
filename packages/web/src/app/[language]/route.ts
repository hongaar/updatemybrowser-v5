import { NextRequest, NextResponse } from "next/server";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export async function GET(
  request: NextRequest,
  { params: { language } }: LanguageParams,
) {
  const url = request.nextUrl.clone();

  if (url.pathname.length > 3) {
    return new Response(
      '<body>Sorry, the page you tried to visit does not exist (anymore). <a href="/">Return to the homepage</a></body>',
      {
        status: 404,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }

  url.pathname = `/${language}/check`;

  return NextResponse.redirect(url, 308);
}
