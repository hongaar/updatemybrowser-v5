import { redirect } from "next/navigation";

export type LanguageParams = {
  params: {
    language: string;
  };
};

export default async function Check({ params: { language } }: LanguageParams) {
  redirect(`/${language}/check`);
}
