import Link from "next/link";
import english from "../../dictionaries/en";

// Global 404 page is not available for internationalization #50699
// https://github.com/vercel/next.js/issues/50699
// export default function NotFound({ params: { language } }: LanguageParams) {
export default function NotFound(params: any) {
  // const dict = getDictionary(props.language);
  const dict = english;

  return (
    <div>
      <h2>{dict.NotFound}</h2>
      <p>{dict.NotFoundDescription}</p>
      <Link href="/">{dict.NotFoundButton}</Link>
    </div>
  );
}
