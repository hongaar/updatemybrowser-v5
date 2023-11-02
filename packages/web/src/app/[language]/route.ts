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
  url.pathname = `/${language}/check`;

  return NextResponse.redirect(url, 308);
}
